/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Runs the game
 * Responsibility:  Main game loop.
 */

import { BaseEnemyObject } from "./Base/BaseEnemyObject";
import BaseGameObject from "./Base/BaseGameObject";
import { DrawGameField } from "./GameScreen/StaticRenders";
import KeyboardState from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Explosion from "./Models/Explosion";
import GameLocation from "./Models/GameLocation";
import { Level, Lives, Phasers, ScoreBoard } from "./Modules";
import ExplosionCenter from "./Particles/ExplosionCenter";
import Particle from "./Particles/Particle";
import { drawPhasor } from "./Player/PlayerShip/DrawPhaser";
import Player from "./Player/PlayerShip/Player";
import PlayerBullet from "./Player/PlayerShip/PlayerBullet";
import PlayerBulletFrame from "./Player/PlayerShip/PlayerBulletFrame";
import CtxProvider from "./Providers/CtxProvider";
import DimensionProvider from "./Providers/DimensionProvider";
import explosionLocationProvider from "./Providers/ExplosionLocationProvider";
import particleProvider from "./Providers/ParticleProvider";
import { getRandomArrayElement } from "./Utility/Array";
import { overlaps } from "./Utility/Geometry";

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
let player: Player | undefined;

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
 * Flag to track if the phaser is beam is currently being fired.
 */
let phaserOnScreen = false;

/**
 * Pause flag
 */
let pause = false;

/**
 * DEBUGGING: When true draws the hitboxes around all game objects.
 */
let drawHitboxes = false;

/**
 * DEBUGGING: When true the player is immortal.
 */
let playerIsImmortal = false;

/**
 * DEBIGGIN: Phaser is rendered against a random game object. Limit to one object and set speed to test.
 */
let renderPhaser = false;

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
    updateState();
    draw(tick);

    animationHandle = window.requestAnimationFrame(run);
}

/**
 * Called every request animation frame.
 */
function updateState() {

    enemies.forEach((e) => e.updateState());
    particles.forEach((e) => e.updateState());
    player?.updateState();
    playerBullet?.updateState();

    if (KeyboardState.selfDestruct) {
        selfDestruct();
    }

    if (KeyboardState.phraser) {
        handlePhaser();
    }

    if (KeyboardState.fire && playerBullet === undefined && player !== undefined) {
        playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 50, 1, player.getNozzleLocation());
    }

    const hittableObjects = getHittableObjects();

    // There's stuff that can get hit or hit something.
    if (hittableObjects.length > 0) {
        for (const hittableObject of hittableObjects) {

            const hittableObjectHitbox = hittableObject.getHitbox();

            // Check if the player got hit.
            if (player && playerIsImmortal === false) {
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
    if (pause) {
        return;
    }

    if (tick - lastTick > fps) {

        DrawGameField();
        Level.draw();
        Lives.draw();
        ScoreBoard.draw();
        Phasers.draw();

        player?.draw(tick);
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

        if (renderPhaser && player && enemies.length > 0) {
            const enemy = enemies[0];
            drawPhasor(player.getNozzleLocation(), enemy.getCenterLocation(), DimensionProvider().averagePixelSize);
        }

        lastTick = tick;
    }
}

/**
 * Triggers the self destruct sequence.
 */
function selfDestruct() {
    if (enemies.length > 0 && player !== undefined) {

        // Reset main rendering.
        const explosionsLocations = enemies.map((a) => explosionLocationProvider(a));
        for (const explosionsLocation of explosionsLocations) {
            const center = new ExplosionCenter(explosionsLocation.explosion.explosionCenterFrame, explosionsLocation.location, explosionsLocation.explosion.explosionCenterDelay);
            const newParticles = particleProvider(explosionsLocation.explosion, explosionsLocation.location);
            particles.push(...newParticles);
            explosionCenters.push(center);
        }

        enemies = [];
        player = undefined;
    }
}

function handlePhaser(): void {
    if (player !== undefined && enemies.length > 0 && Phasers.getPhaserCount() > 0 && phaserOnScreen === false) {

        // Prefent accidental double phasors when the player holds the button to long.
        phaserOnScreen = true;

        const randomEnemy = getRandomArrayElement(enemies);
        const playerNozzleLocation = player.getNozzleLocation();
        const randomEnemyCenter = randomEnemy.getCenterLocation();
        const randomEnemyExplosion = randomEnemy.getExplosion();

        Phasers.removePhaser();
        drawPhasor(playerNozzleLocation, randomEnemyCenter, DimensionProvider().maxPixelSize);

        // Pause the game for a very brief period. This is what the original game did
        // when you fired a phasor shot.
        pause = true;

        window.setTimeout(() => {
            // Unpause the game to let rendering continue.
            pause = false;

            renderExplosion(randomEnemy.getLocation(), randomEnemyExplosion);
            enemies = enemies.filter((e) => e !== randomEnemy);

            // set phasor to undefined to flag it as not in use.
            phaserOnScreen = false;
        }, 100);
    }
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
 * DEBUGGING ONLY: Toggles player immortality.
 */
export function togglePlayerImmortality(): void {
    playerIsImmortal = !playerIsImmortal;
}

/**
 * Toggles rendering the phaser.
 */
export function toggleRenderPhaser(): void {
    renderPhaser = !renderPhaser;
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