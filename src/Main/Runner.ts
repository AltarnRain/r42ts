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
import Particle from "../Particles/Particle";
import { drawPhasor } from "../Player/DrawPhaser";
import PlayerBullet from "../Player/PlayerBullet";
import PlayerBulletFrame from "../Player/PlayerBulletFrame";
import PlayerShip from "../Player/PlayerShip";
import CtxProvider from "../Providers/CtxProvider";
import DimensionProvider from "../Providers/DimensionProvider";
import particleProvider from "../Providers/ParticleProvider";
import { appState, dispatch } from "../State/Store";
import { PlayerFormationPhases } from "../Types/Types";
import { getRandomArrayElement } from "../Utility/Array";
import { overlaps } from "../Utility/Geometry";

let drawHandle: number | undefined = 0;

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
    if (drawHandle === undefined) {

        // use a setTimeOut 0 to push drawing the game to the back of the
        // callback queue. This means updating the game state
        // gets prority over rendering the game.
        drawHandle = window.setTimeout(() => {
            // Draw everything.
            draw();

            // Draw is done, set the state's draw handle to undefined to trigger
            // a new draw.
            drawHandle = undefined;
        }, 0);
    }
}

/**
 * Called every request animation frame.
 * @param {number} tick. Pass the tick count because some objects update their state depending on passed ticks.
 */
function updateState(tick: number) {

    const state = appState();
    if (state.player.playerFormationPhase === "begin" && state.level.particles.length === 0) {

        dispatch<PlayerFormationPhases>("setPlayerFormationPhase", "inprogress");

        PlayerFormation.formSlow(PlayerLocationHandler.getShipSpawnLocation(), () => {
            dispatch<PlayerShip>("setPlayer", new PlayerShip(PlayerLocationHandler.getPlayerLocation()));
            dispatch<PlayerFormationPhases>("setPlayerFormationPhase", undefined);
        });
    } else if (state.player.playerFormationPhase === "inprogress") {
        PlayerFormation.updateState();
    }

    // Update object states.
    state.level.enemies.forEach((e) => e.updateState(tick));
    state.player.ship?.updateState();
    state.player.playerBullet?.updateState();

    // Remove objects no longer required.
    if (state.player.playerBullet?.traveling() === false) {
        dispatch<PlayerBullet>("setBullet", undefined);
    }

    // Update state and remove particles that are done traveling.
    state.level.particles.forEach((p) => {
        if (p.traveling()) {
            p.updateState(tick);
        } else {
            dispatch<BaseParticle>("removeParticle", p);
        }
    });

    // Update explosion center state and remove if they're done burning.
    state.level.explosionCenters.filter((ec) => {
        if (ec.burning()) {
            ec.updateState(tick);
            return true;
        } else {
            dispatch<ExplosionCenter>("removeExplosionCenter", ec);
        }
    });

    // Keyboard events.
    if (playerIsAlive(state.player.ship) && KeyboardState.selfDestruct) {
        for (const enemy of state.level.enemies) {
            queueExplosionRender(enemy.getCenterLocation(), enemy.getExplosion());
        }

        queueExplosionRender(state.player.ship.getLocation(), state.player.ship.getExplosion());

        dispatch<PlayerShip>("setPlayer", undefined);
        dispatch<BaseEnemyObject[]>("setEnemies", []);
    }

    // Hit a random enemy with a phasor.
    // In order to fire a phaser there must be enemies, the player must have a phaser charge, a phaser cannot
    // currently being fired (=on screen) and the player must be alive.
    if (playerIsAlive(state.player.ship) &&
        KeyboardState.phraser &&
        state.level.enemies.length > 0 &&
        state.gameState.phasers > 0 && state.level.phaserOnScreen === false) {
        handlePhaser(state.player.ship);
    }

    if (playerIsAlive(state.player.ship) && KeyboardState.fire && state.player.playerBullet === undefined) {
        state.player.playerBullet = new PlayerBullet(PlayerBulletFrame.F0, 270, 30, 1, state.player.ship.getNozzleLocation());
    }

    // Hit detection.
    const hittableObjects = getHittableObjects();

    // There's stuff that can get hit or hit something.
    if (hittableObjects.length > 0) {
        for (const hittableObject of hittableObjects) {

            const hittableObjectHitbox = hittableObject.getHitbox();

            // Check if the player got hit.
            if (playerIsAlive(state.player.ship) && state.debugging.playerIsImmortal === false) {
                if (overlaps(state.player.ship.getHitbox(), hittableObjectHitbox)) {

                    // Player was hit. Render the explosion.
                    handlePlayerDeath(state.player.ship);
                }
            }

            // Check if the player hit something.
            if (state.player.playerBullet !== undefined && isEnemy(hittableObject)) {
                if (overlaps(state.player.playerBullet.getHitbox(), hittableObjectHitbox)) {
                    state.player.playerBullet = undefined;
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
    const state = appState();
    if (state.level.pause) {
        return;
    }

    // Begin by drawing a black rectangle on the game field before drawing game objects.
    clearGameFieldBackground();

    // Draw all the game objects
    state.player.ship?.draw();
    state.level.enemies.forEach((e) => e.draw());
    state.level.particles.forEach((p) => p.draw());
    state.level.explosionCenters.forEach((ec) => ec.draw());
    state.player.playerBullet?.draw();

    if (state.player.playerFormationPhase === "inprogress") {
        PlayerFormation.draw();
    }

    DEBUGGING_drawPhasor();

    // Debugging. Show the hitboxes on screen.
    DEBUGGING_renderHitboxes();

    // drawGrid();
}

function DEBUGGING_drawPhasor() {
    const state = appState();
    if (state.debugging.renderPhaser && playerIsAlive(state.player.ship) && state.level.enemies.length > 0) {
        const enemy = state.level.enemies[0];
        drawPhasor(state.player.ship.getNozzleLocation(), enemy.getCenterLocation(), DimensionProvider().averagePixelSize);
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemyObject} enemy.
 */
function handleEnemyDestruction(enemy: BaseEnemyObject) {
    const state = appState();
    const remainingEnemies = state.level.enemies.length - 1;
    state.level.enemies.forEach((e) => {
        if (e !== enemy) {
            e.increaseSpeed(state.level.numberOfEnemies / remainingEnemies);
        } else {
            dispatch<BaseEnemyObject>("removeEnemy", e);
        }
    });

    queueExplosionRender(enemy.getLocation(), enemy.getExplosion());
    ScoreBoard.addToScore(enemy.getPoints());
}

/**
 * Handles the firing of a phasor charge.
 * @param {PlayerShip} player. Player object
 */
function handlePhaser(player: PlayerShip): void {
    const state = appState();

    // Prevent accidental double phasors when the player holds the button to long.
    state.level.phaserOnScreen = true;

    const randomEnemy = getRandomArrayElement(state.level.enemies);
    const playerNozzleLocation = player.getNozzleLocation();
    const randomEnemyCenter = randomEnemy.getCenterLocation();

    // Remove one phaser.
    Phasers.reduceByOneCharge();
    drawPhasor(playerNozzleLocation, randomEnemyCenter, DimensionProvider().maxPixelSize);

    // Pause the game for a very brief period. This is what the original game did
    // when you fired a phasor shot.
    state.level.pause = true;
    window.setTimeout(() => {
        // Unpause the game to let rendering continue.
        state.level.pause = false;
        state.level.phaserOnScreen = false;

        // Deal the with the enemy that got hit.
        handleEnemyDestruction(randomEnemy);
    }, 100);
}

/**
 * handles a player's death event.
 * @param {PlayerShip} player. Player object.
 */
function handlePlayerDeath(player: PlayerShip): void {
    const state = appState();
    queueExplosionRender(player.getLocation(), player.getExplosion());
    state.player.ship = undefined;
    Lives.removeLife();

    if (Lives.getLives() > 0) {
        state.player.playerFormationPhase = "begin";
    } else {
        // TODO: handle game over.
    }
}

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
function getHittableObjects(): BaseGameObject[] {
    const state = appState();
    return [
        ...state.level.enemies,
        ...state.level.particles,
        ...state.level.explosionCenters
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

    dispatch<ExplosionCenter>("addExplosionCenter", center);
    dispatch<Particle[]>("addParticles", newParticles);
}

// #region Internal TypeGuards

/**
 * Increases all enemies speed.
 * @param {number} value.
 */
export function increaseEnemySpeed(value: number): void {
    appState().level.enemies.forEach((e) => e.increaseSpeed(value));
}

/**
 * TypeGuard that checks if the player is alive.
 * @param {PlayerShip | undefined}. A player object.
 * @returns {boolean}. Returns true if the player is alove.
 */
function playerIsAlive(value: PlayerShip | undefined): value is PlayerShip {
    return value !== undefined;
}

/**
 * TypeGuard for enemies
 */
function isEnemy(value: any): value is BaseEnemyObject {
    return value && value.getObjectType() === "enemy";
}

// #endregion

//#region  Debugging

function DEBUGGING_renderHitboxes() {
    const state = appState();
    if (state.debugging.drawHitboxes) {
        const hittableObjects = [
            ...getHittableObjects(),
        ];

        // Add player if defined.
        if (state.player) {
            hittableObjects.push(state.player as any);
        }

        // Add bullet if defined.
        if (state.player.playerBullet) {
            hittableObjects.push(state.player.playerBullet);
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

//#endregion
