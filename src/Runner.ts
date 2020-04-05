/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Runs the game
 * Responsibility:  Main game loop.
 */

import { BaseDestructableObject } from "./Base/BaseDestructableObject";
import { BaseEnemyObject } from "./Base/BaseEnemyObject";
import BaseGameObject from "./Base/BaseGameObject";
import { DrawGameField } from "./GameScreen/StaticRenders";
import KeyboardState from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Explosion from "./Models/Explosion";
import GameLocation from "./Models/GameLocation";
import { ObjectHitbox } from "./Models/ObjectHitbox";
import { Level, Lives, Phasers, ScoreBoard } from "./Modules";
import ExplosionCenter from "./Particles/ExplosionCenter";
import Particle from "./Particles/Particle";
import Player from "./Player/Player";
import PlayerBullet from "./Player/PlayerBullet";
import PlayerBulletFrame from "./Player/PlayerBulletFrame";
import CtxProvider from "./Providers/CtxProvider";
import explosionLocationProvider from "./Providers/ExplosionLocationProvider";
import particleProvider from "./Providers/ParticleProvider";
import { getFrameHitbox } from "./Utility/Frame";
import { overlaps } from "./Utility/Lib";

const fps = 1000 / 60;

/**
 * Array of current game objects on screen.
 */
let enemies: BaseEnemyObject[] = [];

/**
 * Animation frame handler.
 */
let animationHandle: number = 0;

/**
 * Keeps track of the last tick when the animation was fired.
 * Used to determine when to call the next frame.
 */
let lastTick: number = 0;

/**
 * Reference to the player object.
 */
let player: Player;

/**
 * Quick reference to the player bullet.
 */
let playerBullet: PlayerBullet | undefined;

/**
 * Particles travelling on the screen.
 */
let particles: Particle[] = [];

/**
 * Explosion centers on the screen.
 */
let explosionCenters: ExplosionCenter[] = [];

/**
 * DEBUGGING: When true draws the hitboxes around all game objects.
 */
let drawHitboxes = false;

/**
 * Start the runner.
 */
export function start(): void {
    animationHandle = window.requestAnimationFrame(run);
}

/**
 * Stop the runner.
 */
export function stop(): void {
    window.cancelAnimationFrame(animationHandle);
}

/**
 * Runs the main game loop.
 * @param {number} tick. The current tick.
 */
function run(tick: number): void {
    // Runs all animation at the passed FPS
    draw(tick);

    // Self destruct
    updateState();

    animationHandle = window.requestAnimationFrame(run);
}

/**
 * Called every request animation frame.
 */
function updateState() {

    if (KeyboardState.selfDestruct) {
        selfDestruct();
    }

    if (KeyboardState.fire && playerBullet === undefined && player !== undefined) {
        playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 50, 1, player.getLocation());
    }

    const hittableObjects = getHittableObjects();

    // There's stuff that can get hit or hit something.
    if (hittableObjects.length > 0) {
        for (const hittableObject of hittableObjects) {

            const hittableObjectHitbox = hittableObject.getHitbox();

            // Check if the player got hit.
            if (player) {
                if (overlaps(player.getHitbox(), hittableObjectHitbox)) {
                    const playerExplosion = player.getExplosion();
                    const playerLocation = player.getLocation();
                    renderExplosion(playerLocation, playerExplosion);
                    player = undefined;
                    Lives.removeLife();
                }
            }

            // Check if the player hit something.
            if (playerBullet && isEnemy(hittableObject)) {

                if (overlaps(playerBullet.getHitbox(), hittableObjectHitbox)) {
                    playerBullet = undefined;
                    renderExplosion(hittableObject.getLocation(), hittableObject.getExplosion());
                    ScoreBoard.addToScore(hittableObject.getPoints());
                    enemies = enemies.filter((e) => e !== hittableObject);
                }
            }
        }
    }
}

/**
 * Called every request animation frame. Draws objects.
 * @param {number} tick. Tick.
 */
function draw(tick: number) {
    if (tick - lastTick > fps) {

        DrawGameField();

        Level.draw();
        Lives.draw();
        ScoreBoard.draw();
        Phasers.draw();

        if (player) {
            player.draw(tick);
        }

        enemies.forEach((go) => go.draw(tick));

        if (particles.length > 0) {
            particles.forEach((p) => p.draw(tick));
            particles = particles.filter((p) => p.inScreen());
        }

        if (explosionCenters.length > 0) {
            explosionCenters.forEach((ec) => ec.draw(tick));
            explosionCenters = explosionCenters.filter((ec) => ec.fizzledOut());
        }

        // Bullet left the field.
        if (playerBullet && !playerBullet.inScreen()) {
            playerBullet = undefined;
        }

        if (playerBullet !== undefined) {
            playerBullet.draw(tick);
        }

        // Debugging. Show the hitboxes on screen.
        if (drawHitboxes) {
            const hittableObjects = [
                ...getHittableObjects(),
            ];

            // Add player if defined.
            if (player) {
                hittableObjects.push(player);
            }

            // Add bullet if defined.
            if (playerBullet) {
                hittableObjects.push(playerBullet);
            }

            // Draw a circle around each object using the
            // coordiates and radius of the hitbox.
            for (const hittableObject of hittableObjects) {
                const hitbox = hittableObject.getHitbox();
                const ctx = CtxProvider();

                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.rect(
                    hitbox.left,
                    hitbox.top,
                    hitbox.right - hitbox.left,
                    hitbox.bottom - hitbox.top);
                ctx.lineWidth = 2;

                ctx.stroke();
                ctx.closePath();
            }
        }

        lastTick = tick;
    }
}

/**
 * Triggers the self destruct sequence.
 */
function selfDestruct() {
    if (enemies.length > 0 && player !== undefined) {
        const destructableObjects = getDestructableObjects();
        // Reset main rendering.
        enemies = [];
        player = undefined;
        const explosionsLocations = destructableObjects.map((a) => explosionLocationProvider(a));
        for (const explosionsLocation of explosionsLocations) {
            const center = new ExplosionCenter(explosionsLocation.explosion.explosionCenterFrame, explosionsLocation.location, explosionsLocation.explosion.explosionCenterDelay);
            const newParticles = particleProvider(explosionsLocation.explosion, explosionsLocation.location);
            particles.push(...newParticles);
            explosionCenters.push(center);
        }
    }
}

/**
 * Returns objects that can be destroyed.
 * @returns {BaseDestructableObject}. Objects which return an Explosion asset.
 */
function getDestructableObjects(): BaseDestructableObject[] {
    return [
        ...enemies,
        player
    ];
}

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
function getHittableObjects(): BaseGameObject[] {
    return [
        ...enemies,
        ...particles,
        ...explosionCenters
    ].filter((o) => o !== undefined);
}

/**
 * Renders an explosion and explosion center.
 * @param {Explosion} explosion. An explosion asset.
 * @param {GameLocation} location. The center location where the explosion occurs.
 */
function renderExplosion(location: GameLocation, explosion: Explosion) {
    const center = new ExplosionCenter(explosion.explosionCenterFrame, location, explosion.explosionCenterDelay);
    const newParticles = particleProvider(explosion, location);
    particles.push(...newParticles);
    explosionCenters.push(center);
}

/**
 * Register a game object.
 * @param {BaseGameObject} gameobject.
 */
export function register(gameobject: BaseGameObject): void {
    if (isEnemy(gameobject)) {
        enemies.push(gameobject);
    } else if (isPlayer(gameobject)) {
        player = gameobject;
    } else if (isParticle(gameobject)) {
        particles.push(gameobject);
    }
}

/**
 * Updates the speed for all enemies.
 * @param {number} value.
 */
export function setEnemySpeed(value: number): void {
    enemies.forEach((e) => e.setSpeed(value));
}

/**
 * DEBUGGING ONLY: Toggles drawing hitboxes around the enemy, player and player bullet.
 */
export function toggleHitboxes(): void {
    drawHitboxes = !drawHitboxes;
}

/**
 * TypeGuard for enemies
 */
function isEnemy(value: BaseGameObject): value is BaseEnemyObject {
    return value && value.getObjectType() === "enemy";
}

/**
 * TypeGuard for the player
 */
function isPlayer(value: BaseGameObject): value is Player {
    return value && value.getObjectType() === "player";
}

/**
 * TypeGuard for particles.
 */
function isParticle(value: BaseGameObject): value is Particle {
    return value && value.getObjectType() === "particle";
}