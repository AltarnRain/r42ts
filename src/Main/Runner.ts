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
import BaseParticle from "../Base/BaseParticle";
import { clearGameFieldBackground } from "../GameScreen/StaticRenders";
import KeyboardState from "../Handlers/KeyboardStateHandler/KeyboardStateHandler";
import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { Lives, Phasers, PlayerFormation, PlayerLocationHandler, ScoreBoard } from "../Modules";
import ExplosionCenter from "../Particles/ExplosionCenter";
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
}

/**
 * Stop the runner.
 */
export function stop(): void {
    resetState();
}

/**
 * Register a game object.
 * @param {BaseGameObject} gameobject.
 */
export function register(gameobject: BaseGameObject | BaseParticle | Player): void {
    if (isParticle(gameobject)) {
        state.particles.push(gameobject);
    } else if (isEnemy(gameobject)) {
        state.enemies.push(gameobject);
    } else if (isPlayer(gameobject)) {
        state.player = gameobject;
    }
}

/**
 * Returns the number of particles on the screen
 * @returns {number}. Number of particle on screen.
 */
export function getParticleCount(): number {
    return state.particles.length;
}

/**
 * Runs the main game loop.
 * @param {number} tick. The current tick.
 */
export function run(tick: number): void {
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
}

/**
 * Called every request animation frame.
 * @param {number} tick. Pass the tick count because some objects update their state depending on passed ticks.
 */
function updateState(tick: number) {

    if (state.playerFormationPhase === "begin" && getParticleCount() === 0) {
        state.playerFormationPhase = "inprogress";

        PlayerFormation.formSlow(PlayerLocationHandler.getShipSpawnLocation(), () => {
            register(new Player(PlayerLocationHandler.getPlayerLocation()));
            state.playerFormationPhase = undefined;
        });
    } else if (state.playerFormationPhase === "inprogress") {
        PlayerFormation.updateState();
    }

    // Update object states.
    state.enemies.forEach((e) => e.updateState(tick));
    state.player?.updateState();
    state.playerBullet?.updateState();

    // Remove objects no longer required.
    if (state.playerBullet?.traveling() === false) {
        state.playerBullet = undefined;
    }

    // Update state and remove particles that are done traveling.
    state.particles = state.particles.filter((p) => {
        if (p.traveling()) {
            p.updateState(tick);
            return true;
        } else {
            return false;
        }
    });

    // Update explosion center state and remove if they're done burning.
    state.explosionCenters = state.explosionCenters.filter((ec) => {
        if (ec.burning()) {
            ec.updateState(tick);
            return true;
        } else {
            return false;
        }
    });

    // Keyboard events.
    if (playerIsAlive(state.player) && KeyboardState.selfDestruct) {
        for (const enemy of state.enemies) {
            queueExplosionRender(enemy.getCenterLocation(), enemy.getExplosion());
        }

        queueExplosionRender(state.player.getLocation(), state.player.getExplosion());

        state.enemies = [];
        state.player = undefined;
    }

    // Hit a random enemy with a phasor.
    // In order to fire a phaser there must be enemies, the player must have a phaser charge, a phaser cannot
    // currently being fired (=on screen) and the player must be alive.
    if (playerIsAlive(state.player) && KeyboardState.phraser && state.enemies.length > 0 && Phasers.getPhaserCount() > 0 && state.phaserOnScreen === false) {
        handlePhaser(state.player);
    }

    if (playerIsAlive(state.player) && KeyboardState.fire && state.playerBullet === undefined) {
        state.playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 30, 1, state.player.getNozzleLocation());
    }

    // Hit detection.
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
 * Called every request animation frame. Draws objects.
 * @param {number} tick. Tick.
 */
function draw(): void {
    if (state.pause) {
        return;
    }

    // Begin by drawing a black rectangle on the game field before drawing game objects.
    clearGameFieldBackground();

    // Draw all the game objects
    state.player?.draw();
    state.enemies.forEach((e) => e.draw());
    state.particles.forEach((p) => p.draw());
    state.explosionCenters.forEach((ec) => ec.draw());
    state.playerBullet?.draw();

    if (state.playerFormationPhase === "inprogress") {
        PlayerFormation.draw();
    }

    DEBUGGING_drawPhasor();

    // Debugging. Show the hitboxes on screen.
    DEBUGGING_renderHitboxes();

    // drawGrid();
}

function DEBUGGING_drawPhasor() {
    if (state.debugging.renderPhaser && playerIsAlive(state.player) && state.enemies.length > 0) {
        const enemy = state.enemies[0];
        drawPhasor(state.player.getNozzleLocation(), enemy.getCenterLocation(), DimensionProvider().averagePixelSize);
    }
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

    queueExplosionRender(enemy.getLocation(), enemy.getExplosion());
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
 * handles a player's death event.
 * @param {Player} player. Player object.
 */
function handlePlayerDeath(player: Player): void {
    queueExplosionRender(player.getLocation(), player.getExplosion());
    state.player = undefined;
    Lives.removeLife();

    if (Lives.getLives() > 0) {
        state.playerFormationPhase = "begin";
    } else {
        // TODO: handle game over.
    }
}

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
function getHittableObjects(): BaseGameObject[] {
    return [
        ...state.enemies,
        ...state.particles,
        ...state.explosionCenters
    ].filter((o) => o !== undefined);
}

/**
 * queue's an explosion center and the explosion particles.
 * @param {Explosion} explosion. An explosion asset.
 * @param {GameLocation} location. The center location where the explosion occurs.
 * @param {Particle[]} targetParticleArray. The array where the particles will be pushed into. Helps keep track of particles belonging to the player or an enemy.
 */
function queueExplosionRender(location: GameLocation, explosion: Explosion): void {
    const center = new ExplosionCenter(explosion.explosionCenterFrame, location, explosion.explosionCenterDelay);
    const newParticles = particleProvider(location, explosion);
    state.explosionCenters.push(center);

    state.particles.push(...newParticles);
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
function isEnemy(value: any): value is BaseEnemyObject {
    return value && value.getObjectType() === "enemy";
}

/**
 * TypeGuard for the player
 */
function isPlayer(value: any): value is Player {
    return value && value.getObjectType() === "player";
}

/**
 * TypeGuard for particles.
 */
function isParticle(value: any): value is BaseParticle {
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
        particles: [],

        // Flag to track if the phaser is currently on the screen.
        // Used to prevent double phaser shots because KeyDown will re-trigger
        // a phaser shot.
        phaserOnScreen: false,

        // Handle for a setTimeOut.
        drawHandle: undefined,

        numberOfEnemies: 0,

        playerFormationPhase: undefined,

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

function DEBUGGING_renderHitboxes() {
    if (state.debugging.drawHitboxes) {
        const hittableObjects = [
            ...getHittableObjects(),
        ];

        // Add player if defined.
        if (state.player) {
            hittableObjects.push(state.player as any);
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
