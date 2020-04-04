/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Runs the game
 * Responsibility:  Main game loop.
 */

import BaseGameObject from "./Base/BaseGameObject";
import { DrawGameField } from "./GameScreen/StaticRenders";
import KeyboardState from "./Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Explosion from "./Models/Explosion";
import GameLocation from "./Models/GameLocation";
import { Level, Lives, Phasers, ScoreBoard } from "./Modules";
import ExplosionCenter from "./Particles/ExplosionCenter";
import Particle from "./Particles/Particle";
import Player from "./Player/Player";
import PlayerBullet from "./Player/PlayerBullet";
import PlayerBulletFrame from "./Player/PlayerBulletFrame";
import explosionLocationProvider from "./Providers/ExplosionLocationProvider";
import particleProvider from "./Providers/ParticleProvider";
import { overlaps } from "./Utility/Lib";

const fps = 1000 / 60;

/**
 * Array of current game objects on screen.
 */
let enemies: BaseGameObject[] = [];

/**
 * Animation frame handler.
 */
let handler: number = 0;

/**
 * Keeps track of the last tick when the animation was fired.
 * Used to determine when to call the next frame.
 */
let lastTick: number = 0;

/**
 * Reference to the player object.
 */
let player: BaseGameObject;

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
 * Start the runner.
 */
export function start(): void {
    handler = window.requestAnimationFrame(run);
}

/**
 * Stop the runner.
 */
export function stop(): void {
    window.cancelAnimationFrame(handler);
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

    handler = window.requestAnimationFrame(run);
}

/**
 * Called every request animation frame.
 */
function updateState() {
    if (KeyboardState.selfDestruct) {
        if (enemies.length > 0 && player !== undefined) {
            const assets = [
                ...enemies,
                player
            ];
            // Reset main rendering.
            enemies = [];
            player = undefined;
            const explosionsLocations = assets.map((a) => explosionLocationProvider(a));
            for (const explosionsLocation of explosionsLocations) {
                const center = new ExplosionCenter(explosionsLocation.explosion.frame, explosionsLocation.location, explosionsLocation.explosion.explosionCenterDelay);
                const newParticles = particleProvider(explosionsLocation.explosion, explosionsLocation.location);
                particles.push(...newParticles);
                explosionCenters.push(center);
            }
        }
    }

    if (KeyboardState.fire && playerBullet === undefined && player !== undefined) {
        playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 50, 1, player.getLocation());
    }

    if (player !== undefined || playerBullet !== undefined) {
        const hittableObjects = [
            ...enemies,
            ...particles,
            ...explosionCenters
        ].filter((o) => o !== undefined);

        if (hittableObjects.length > 0) {
            for (const hittableObject of hittableObjects) {
                const type = hittableObject.getObjectType();
                switch (type) {
                    case "explosion":
                    case "particle":
                    case "enemy": {
                        // Check if player got hit.
                        if (player !== undefined) {
                            // Get all the locations of hittable objects and check if the player might be hit.
                            const hittableObjectLocations = hittableObject.getLocations();
                            const playerLocations = player.getLocations();
                            const playerExplosion = player.getExplosion();
                            const playerLocation = player.getLocation();
                            hittableObjectLocations.forEach((hloc) => {
                                playerLocations.forEach((ploc) => {
                                    const playerHit = overlaps(hloc, ploc);
                                    if (playerHit) {
                                        renderExplosion(playerExplosion, playerLocation);
                                        player = undefined;
                                        Lives.removeLife();
                                    }
                                });
                            });
                        }
                    }
                    case "playerbullet": {
                        if (playerBullet) {
                            const hittableObjectLocations = hittableObject.getLocations();
                            const playerBulletLocations = playerBullet.getLocations();
                            hittableObjectLocations.forEach((hloc) => {
                                playerBulletLocations.forEach((ploc) => {
                                    const hit = overlaps(hloc, ploc);
                                    if (hit) {
                                        playerBullet = undefined;
                                        if (hittableObject.getObjectType() === "enemy") {
                                            renderExplosion(hittableObject.getExplosion(), hittableObject.getLocation());
                                            ScoreBoard.addToScore(hittableObject.getPoints());
                                            enemies = enemies.filter((e) => e !== hittableObject);
                                        }
                                    }
                                });
                            });
                        }
                    }
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

        lastTick = tick;
    }
}

function renderExplosion(explosion: Explosion, location: GameLocation) {
    const center = new ExplosionCenter(explosion.frame, location, explosion.explosionCenterDelay);
    const newParticles = particleProvider(explosion, location);
    particles.push(...newParticles);
    explosionCenters.push(center);
}

/**
 * Register an IDrawable class.
 * @param drawable.
 * @returns {() => void}. Function to remove the object from the array of drawable objects.
 */
export function register(gameObject: BaseGameObject): void {
    enemies.push(gameObject);
}

/**
 * Registeres the player
 * @param {Player} value. Player object.
 */
export function registerPlayer(value: Player) {
    player = value;
}