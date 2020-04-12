/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Runs the game
 * Responsibility:  Main game loop.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import BaseGameObject from "../Base/BaseGameObject";
import { DrawGameField } from "../GameScreen/StaticRenders";
import KeyboardState from "../Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { Level, Lives, Phasers, ScoreBoard } from "../Modules";
import ExplosionCenter from "../Particles/ExplosionCenter";
import Particle from "../Particles/Particle";
import { drawPhasor } from "../Player/DrawPhaser";
import Player from "../Player/Player";
import PlayerBullet from "../Player/PlayerBullet";
import PlayerBulletFrame from "../Player/PlayerBulletFrame";
import CtxProvider from "../Providers/CtxProvider";
import DimensionProvider from "../Providers/DimensionProvider";
import particleProvider from "../Providers/ParticleProvider";
import { getRandomArrayElement } from "../Utility/Array";
import { overlaps } from "../Utility/Geometry";
import { RunnerState } from "./RunnerState";

// Initialise the base runner state.
// This object is the Single Source Of truth for the runner.
const state: RunnerState = initState();

/**
 * Start the runner.
 */
export function start(): void {
    // Store the number of enemies when the game loop starts.
    state.numberOfEnemies = state.enemies.length;
    state.gameLoopHandle = window.requestAnimationFrame(run);
}

/**
 * Stop the runner.
 */
export function stop(): void {
    window.cancelAnimationFrame(state.gameLoopHandle);

    resetState();
}

/**
 * Register a game object.
 * @param {BaseGameObject} gameobject.
 */
export function register(gameobject: BaseGameObject): void {
    if (isEnemy(gameobject)) {
        state.enemies.push(gameobject);
    } else if (isPlayer(gameobject)) {
        state.player = gameobject;
    } else if (isParticle(gameobject)) {
        state.generalParticles.push(gameobject);
    }
}

/**
 * Register a call back for a player death event.
 * @param {() => void} callback. A function that is called when the player dies.
 */
export function registerOnPlayerDeath(callback: () => void): void {
    state.onPlayerDestroyed = callback;
}

/**
 * playerParticlesOnScreen
 * @returns {boolean}. Returns true if there's player ship's paricles on the screen.
 */
export function playerParticlesOnScreen(): boolean {
    return state.playerShipParticles.length > 0;
}

/**
 * Runs the main game loop.
 * @param {number} tick. The current tick.
 */
function run(tick: number): void {
    // Always update the state before drawing on the canvas. This means
    // the player is seeing the latest version of the game's state
    // and it will feel much more accurate. It also
    // means the game will not render objects that are about to be removed from the game's state.
    // For example, explosions and particles that moved out of the game's playing field.
    updateState(tick);

    // Drawing is async. Don't draw when there's a draw is process. Keep calculating the state.
    if (state.drawHandle === undefined) {

        // use a setTimeOut 0 to push drawing the game to the back of the
        // callback queue. This means updating the game state
        // gets prority over rendering the game.
        state.drawHandle = window.setTimeout(() => {
            // Draw everything.
            draw();

            // Draw is done, set the state's draw handle to undefined to trigger
            // a new draw.
            state.drawHandle = undefined;
        }, 0);
    }

    // Queue the next state update and render.
    state.gameLoopHandle = window.requestAnimationFrame(run);
}

/**
 * Called every request animation frame.
 * @param {number} tick. Pass the tick count because some objects update their state depending on passed ticks.
 */
function updateState(tick: number) {

    // First update the runner's own state by removing particles that can be removed.
    state.generalParticles = state.generalParticles.filter((p) => p.traveling());

    // Remove player ship particles when they move out of the screen.
    state.playerShipParticles = state.playerShipParticles.filter((p) => p.traveling());

    // Remove explosion centers that have spend their alloted time on screen.
    state.explosionCenters = state.explosionCenters.filter((ec) => ec.fizzledOut());

    // Immediately update the player state because if the player is destroyed the
    // player object will be undefined.
    state.player?.updateState();

    // Trigger self destruct sequence.
    if (KeyboardState.selfDestruct && playerIsAlive(state.player)) {
        for (const enemy of state.enemies) {
            queueRenderExplosion(enemy.getCenterLocation(), enemy.getExplosion(), state.generalParticles);
        }

        queueRenderExplosion(state.player.getLocation(), state.player.getExplosion(), state.playerShipParticles);

        state.enemies = [];
        state.player = undefined;
    }

    // Hit a random enemy with a phasor.
    // In order to fire a phaser there must be enemies, the player must have a phaser charge, a phaser cannot
    // currently being fired (=on screen) and the player must be alive.
    if (KeyboardState.phraser && state.enemies.length > 0 && Phasers.getPhaserCount() > 0 && state.phaserOnScreen === false && playerIsAlive(state.player)) {
        handlePhaser(state.player);
    }

    if (state.playerBullet === undefined) {
        if (KeyboardState.fire && playerIsAlive(state.player)) {
            state.playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 50, 1, state.player.getNozzleLocation());
        }
    } else {
        state.playerBullet.updateState();
    }

    state.enemies.forEach((e) => e.updateState(tick));
    state.generalParticles.forEach((e) => e.updateState());

    // Bullet left the field. Set to undefined.
    if (state.playerBullet && !state.playerBullet.traveling()) {
        state.playerBullet = undefined;
    }

    const hittableObjects = getHittableObjects();

    // There's stuff that can get hit or hit something.
    if (hittableObjects.length > 0) {
        for (const hittableObject of hittableObjects) {

            const hittableObjectHitbox = hittableObject.getHitbox();

            // Check if the player got hit.
            if (playerIsAlive(state.player) && state.debugging.playerIsImmortal === false) {
                if (overlaps(state.player.getHitbox(), hittableObjectHitbox)) {

                    // Player was hit. Render the explosion.
                    handlePlayerDeath(state.player);
                }
            }

            // Check if the player hit something.
            if (state.playerBullet !== undefined && isEnemy(hittableObject)) {
                if (overlaps(state.playerBullet.getHitbox(), hittableObjectHitbox)) {
                    state.playerBullet = undefined;
                    handleEnemyDestruction(hittableObject);
                }
            }
        }
    }
}

/**
 * handles a player's death event.
 * @param {Player} player. Player object.
 */
function handlePlayerDeath(player: Player): void {
    queueRenderExplosion(player.getLocation(), player.getExplosion(), state.playerShipParticles);
    state.player = undefined;
    Lives.removeLife();

    state.onPlayerDestroyed();
}

/**
 * Called every request animation frame. Draws objects.
 * @param {number} tick. Tick.
 */
function draw(): void {
    if (state.pause) {
        return;
    }

    // Draw the static stuff.
    DrawGameField();
    Level.draw();
    Lives.draw();
    ScoreBoard.draw();
    Phasers.draw();

    // If defined, draw the player
    state.player?.draw();

    // Draw all enemies
    state.enemies.forEach((e) => e.draw());

    // Draw enemy particles.
    state.generalParticles.forEach((p) => p.draw());

    // Draw playerShipParticles.
    state.playerShipParticles.forEach((p) => p.draw());

    // Draw the explosion centers.
    state.explosionCenters.forEach((ec) => ec.draw());

    // If there's a player bullet, draw it.
    state.playerBullet?.draw();

    if (state.debugging.renderPhaser && playerIsAlive(state.player) && state.enemies.length > 0) {
        const enemy = state.enemies[0];
        drawPhasor(state.player.getNozzleLocation(), enemy.getCenterLocation(), DimensionProvider().averagePixelSize);
    }

    // Debugging. Show the hitboxes on screen.
    renderHitboxes();
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemyObject} enemy.
 */
function handleEnemyDestruction(enemy: BaseEnemyObject) {

    const remainingEnemies = state.enemies.length - 1;
    state.enemies = state.enemies.filter((e) => {
        if (e !== enemy) {
            e.increaseSpeed(state.numberOfEnemies / remainingEnemies);
            return true;
        } else {
            return false;
        }
    });

    queueRenderExplosion(enemy.getLocation(), enemy.getExplosion(), state.generalParticles);
    ScoreBoard.addToScore(enemy.getPoints());
}

/**
 * Handles the firing of a phasor charge.
 * @param {Player} player. Player object
 */
function handlePhaser(player: Player): void {
    // Prevent accidental double phasors when the player holds the button to long.
    state.phaserOnScreen = true;

    const randomEnemy = getRandomArrayElement(state.enemies);
    const playerNozzleLocation = player.getNozzleLocation();
    const randomEnemyCenter = randomEnemy.getCenterLocation();

    // Remove one phaser.
    Phasers.reduceByOneCharge();
    drawPhasor(playerNozzleLocation, randomEnemyCenter, DimensionProvider().maxPixelSize);

    // Pause the game for a very brief period. This is what the original game did
    // when you fired a phasor shot.
    state.pause = true;
    window.setTimeout(() => {
        // Unpause the game to let rendering continue.
        state.pause = false;
        state.phaserOnScreen = false;

        // Deal the with the enemy that got hit.
        handleEnemyDestruction(randomEnemy);
    }, 100);
}

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
function getHittableObjects(): BaseGameObject[] {
    return [
        ...state.enemies,
        ...state.generalParticles,
        ...state.explosionCenters
    ].filter((o) => o !== undefined);
}

/**
 * queue's an explosion center and the explosion particles.
 * @param {Explosion} explosion. An explosion asset.
 * @param {GameLocation} location. The center location where the explosion occurs.
 * @param {Particle[]} targetParticleArray. The array where the particles will be pushed into. Helps keep track of particles belonging to the player or an enemy.
 */
function queueRenderExplosion(location: GameLocation, explosion: Explosion, targetParticleArray: Particle[]): void {
    const center = new ExplosionCenter(explosion.explosionCenterFrame, location, explosion.explosionCenterDelay);
    const newParticles = particleProvider(location, explosion);
    state.explosionCenters.push(center);

    targetParticleArray.push(...newParticles);
}

// #region Internal TypeGuards

/**
 * Increases all enemies speed.
 * @param {number} value.
 */
export function increaseEnemySpeed(value: number): void {
    state.enemies.forEach((e) => e.increaseSpeed(value));
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

/**
 * TypeGuard that checks if the player is alive.
 * @param {Player | undefined}. A player object.
 * @returns {boolean}. Returns true if the player is alove.
 */
function playerIsAlive(value: Player | undefined): value is Player {
    return value !== undefined;
}

// #endregion

// #region State initialisation and reset

/**
 * initState. Initializes the Runner state.
 * @returns {RunnerState}. Fresh state for the Runner module.
 */
function initState(): RunnerState {
    return {
        // Array for all enemy objects.
        enemies: [],

        // Handle used to terminate the animatio request.
        gameLoopHandle: 0,

        // Reference to the player object. Used to render player actions and update player state.
        // When undefined the player is dead.
        player: undefined,

        // Reference to the player bullet object.
        // When undefined there's no bullet traveling on the screen.
        playerBullet: undefined,

        // Flag if the game is paused or not.
        pause: false,

        // Array of explosion centers currently on the screen.
        explosionCenters: [],

        // Array of particles moving on the screen.
        generalParticles: [],

        // Array of particles dedicated to the player's ship explosion.
        playerShipParticles: [],

        // Flag to track if the phaser is currently on the screen.
        // Used to prevent double phaser shots because KeyDown will re-trigger
        // a phaser shot.
        phaserOnScreen: false,

        // Handle for a setTimeOut.
        drawHandle: undefined,

        numberOfEnemies: 0,

        onPlayerDestroyed: () => { /* Empty on purpose. */ },

        // Options for debugging.
        debugging: {
            // Draws hitboxes around all game objects.
            drawHitboxes: false,

            // Disables hit detection for the player.
            playerIsImmortal: false,

            // Draws the phaser. Picks the first enemy in the enemies array.
            renderPhaser: false,
        }
    };
}

/**
 * resetState. Resets the runner's state.
 */
function resetState(): void {
    const freshState = initState();

    // I do not want a string key indexer on the RunnerState definition, nor do I want to define it with 'let'
    Object.keys(state).forEach((key) => {
        (state as any)[key] = (freshState as any)[key];
    });
}

// #endregion

//#region  Debugging

function renderHitboxes() {
    if (state.debugging.drawHitboxes) {
        const hittableObjects = [
            ...getHittableObjects(),
        ];
        // Add player if defined.
        if (state.player) {
            hittableObjects.push(state.player);
        }
        // Add bullet if defined.
        if (state.playerBullet) {
            hittableObjects.push(state.playerBullet);
        }
        // Draw a circle around each object using the
        // coordiates and radius of the hitbox.
        for (const hittableObject of hittableObjects) {
            const hitbox = hittableObject.getHitbox();
            const ctx = CtxProvider();
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.rect(hitbox.left, hitbox.top, hitbox.right - hitbox.left, hitbox.bottom - hitbox.top);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    }
}

/**
 * DEBUGGING ONLY: Toggles drawing hitboxes around the enemy, player and player bullet.
 */
export function toggleHitboxes(): void {
    state.debugging.drawHitboxes = !state.debugging.drawHitboxes;
}

/**
 * DEBUGGING ONLY: Toggles player immortality.
 */
export function togglePlayerImmortality(): void {
    state.debugging.playerIsImmortal = !state.debugging.playerIsImmortal;
}

/**
 * Toggles rendering the phaser.
 */
export function toggleRenderPhaser(): void {
    state.debugging.renderPhaser = !state.debugging.renderPhaser;
}

/**
 * Sets all enemies speed.
 * @param {number} speed. The speed to set.
 */
export function setEnemySpeed(speed: number): void {
    state.enemies.forEach((e) => e.setSpeed(speed));
}

//#endregion
