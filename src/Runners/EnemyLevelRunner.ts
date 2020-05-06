/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import Explosion from "../Models/Explosion";
import getPhaserLocations from "../Player/GetPhaserLocations";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import renderFrame from "../Render/RenderFrame";
import { addExplosionCenter, addParticles, clearPhaserLocations, removeEnemy, setBulletState, setExplosionCenters, setPhaserLocations, setShrapnellState, setTotalEnemies } from "../State/EnemyLevel/Actions";
import { Enemy } from "../State/EnemyLevel/Enemy";
import { ExplosionCenterState } from "../State/EnemyLevel/ExplosionCenterState";
import { increaseScore, removeLife, removePhaser, setPause } from "../State/Game/Actions";
import { setPlayerBulletState, setPlayerLocationData, setPlayerOnScreen } from "../State/Player/Actions";
import { StateProviders } from "../State/StateProviders";
import { appState, dispatch } from "../State/Store";
import { Frame } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { getFrameHitbox } from "../Utility/Frame";
import { overlaps } from "../Utility/Geometry";

/**
 * Module:          EnemyLevelRunner
 * Responsibility:  Handles all state reactions and action for levels that contain enemies.
 */

/**
 * Array of current game objects on screen.
 */

const localState: { enemies: Enemy[] } = {
    enemies: [],
};

const phaserFrame: Frame = [
    [CGAColors.yellow, CGAColors.yellow]
];

const {
    pixelSize
} = dimensionProvider();

export namespace EnemyLevelRunner {
    /**
     * Runner function that can be registered in the GameLoop.
     * @param {number} tick. The current tick.
     */
    export function run(tick: number): void {
        updateState(tick);
        GameLoop.registerDraw(draw);
    }

    export function setEnemies(newEnemies: Enemy[]): void {
        localState.enemies = newEnemies;
        dispatch(setTotalEnemies(newEnemies.length));
    }

    export function getEnemies(): Enemy[] {
        return localState.enemies;
    }
}

export default EnemyLevelRunner;

/**
 * Handles all level state changes.
 * @param {number} tick. Current tick.
 */
function updateState(tick: number) {
    const { gameState } = appState();

    if (gameState.pause) {
        return;
    }

    handleSelfDestruct(tick);
    handlePhaser(tick);
    handleShrapnell();
    handleBullets();
    handleEnemies(tick);
    handleExplosionCenters(tick);
    handleHitDetection(tick);
}

/**
 * Draws all objects part of the level but not the player.
 * @param {number} tick. Tick.
 */
function draw(): void {
    const { enemyLevelState } = appState();
    const { explosionCenters, explosionData } = enemyLevelState;

    // Draw all the game objects

    for (const enemyState of enemyLevelState.enemyState) {
        if (enemyState.currentFrame !== undefined) {
            renderFrame(enemyState.offsetLeft, enemyState.offsetTop, enemyState.currentFrame);
        }
    }

    if (explosionData) {
        for (const center of explosionCenters) {
            renderFrame(center.left, center.top, center.coloredFrame);
        }
    }

    for (const shrapnell of enemyLevelState.shrapnell) {
        renderFrame(shrapnell.left, shrapnell.top, shrapnell.coloredFrame);
    }

    for (const bullet of enemyLevelState.bullets) {
        renderFrame(bullet.left, bullet.top, bullet.coloredFrame);
    }

    enemyLevelState.phaserLocations.forEach((pf) => renderFrame(pf.left, pf.top, phaserFrame));

    // DEBUGGING_drawPhaser();

    // Debugging. Show the hitboxes on screen.
    DEBUGGING_renderHitboxes();

    // drawGrid();
}

/**
 * Handles all hit detection.
 */
function handleHitDetection(tick: number) {
    const {
        debuggingState,
        enemyLevelState,
        playerState
    } = appState();

    for (const enemyState of enemyLevelState.enemyState) {

        if (enemyState.hitbox !== undefined) {
            // In this loop the state is updated. We need to get the most
            // recent one.
            // Check if the player got hit.
            if (playerState.playerHitbox && debuggingState.playerIsImmortal === false) {
                if (overlaps(playerState.playerHitbox, enemyState.hitbox)) {
                    // Player was hit. Render the explosion.
                    handlePlayerDeath(tick);
                }
            }

            // Check if the player hit something.
            if (playerState.playerBulletState?.hitbox !== undefined) {
                if (overlaps(playerState.playerBulletState.hitbox, enemyState.hitbox)) {
                    dispatch(setPlayerBulletState(undefined));

                    const enemy = localState.enemies.find((e) => e.ship.getId() === enemyState.enemyId);
                    if (enemy !== undefined) {
                        handleEnemyDestruction(enemy.ship, tick);
                    }
                }
            }
        }
    }
}

/**
 * Handles explosion centers.
 * @param {number} tick. Current tick
 */
function handleExplosionCenters(tick: number): void {
    const { explosionCenters, explosionData } = appState().enemyLevelState;

    if (explosionData !== undefined) {
        const burnTime = explosionData.explosionCenterDelay;
        const remainingExplosions = explosionCenters.filter((ec) => ec.startTick + burnTime > tick);

        dispatch(setExplosionCenters(remainingExplosions));
    }
}

/**
 * Handles enemy state updates.
 * @param {number} tick. Current tick
 */
function handleEnemies(tick: number): void {
    localState.enemies.forEach((e) => {
        e.ship.updateState(tick);
    });
}

/**
 * Handles particles state updates.
 * @param {number} tick. Current tick.
 */
function handleShrapnell(): void {
    const newState = StateProviders.getUpdatedParticleState(appState().enemyLevelState.shrapnell);
    dispatch(setShrapnellState(newState));
}

/**
 * Handle bullet movement.
 */
function handleBullets(): void {
    const bullets = appState().enemyLevelState.bullets;
    const newState = StateProviders.getUpdatedParticleState(bullets);

    dispatch(setBulletState(newState));
}

/**
 * Handle self destruct.
 */
function handleSelfDestruct(tick: number): void {
    const { playerState, enemyLevelState } = appState()

    if (playerState.playerOnScreen && appState().keyboardState.selfDestruct) {
        for (const enemy of localState.enemies) {

            const enemyState = StateProviders.getEnemyState(enemy.ship);
            queueExplosionRender(enemyState.offsetLeft, enemyState.offsetTop, enemyState.coloredExplosion, tick);
        }

        queueExplosionRender(playerState.playerLeftLocation, playerState.playerTopLocation, playerState.playerExplosion, tick);
        handlePlayerDeath(tick);
        localState.enemies = [];
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemy} enemy.
 */
function handleEnemyDestruction(ship: BaseEnemy, tick: number): void {
    const { enemyLevelState } = appState();

    localState.enemies = localState.enemies.filter((e) => {
        if (e.ship !== ship) {
            e.ship.increaseSpeed(enemyLevelState.totalNumberOfEnemies / (localState.enemies.length - 1));
            return true;
        } else {
            return false;
        }
    });

    const enemyState = StateProviders.getEnemyState(ship);
    queueExplosionRender(enemyState.offsetLeft, enemyState.offsetTop, enemyState.coloredExplosion, tick);
    dispatch(removeEnemy(enemyState.enemyId));
    dispatch(increaseScore(ship.getPoints()));
}

/**
 * Handles the firing of a phaser charge.
 */
function handlePhaser(tick: number): void {
    const { enemyLevelState, playerState, gameState, keyboardState } = appState();

    if (playerState.playerNozzleLocation &&
        keyboardState.phraser &&
        localState.enemies.length > 0 &&
        gameState.phasers > 0 &&
        enemyLevelState.phaserLocations.length === 0) {

        const randomEnemy = getRandomArrayElement(enemyLevelState.enemyState);
        const playerNozzleLocation = playerState.playerNozzleLocation;
        const randomEnemyCenter = randomEnemy.centerLocation;
        if (randomEnemyCenter !== undefined) {
            // Remove one phaser.
            dispatch(removePhaser());
            const phaserLocations = getPhaserLocations(playerNozzleLocation.left, playerNozzleLocation.top, randomEnemyCenter.left, randomEnemyCenter.top, pixelSize);
            dispatch(setPhaserLocations(phaserLocations));

            // Pause the game for a very brief period. This is what the original game did
            // when you fired a phasor shot.
            dispatch(setPause(true));
            window.setTimeout(() => {
                // Unpause the game to let rendering continue.
                dispatch(setPause(false));

                // Deal the with the enemy that got hit.

                const enemy = localState.enemies.find((e) => e.ship.getId() === randomEnemy.enemyId);
                if (enemy !== undefined) {
                    handleEnemyDestruction(enemy.ship, tick);
                }

                dispatch(clearPhaserLocations());
            }, 100);
        }
    }
}

/**
 * handles a player's death event.
 */
function handlePlayerDeath(tick: number): void {
    const { playerState } = appState();

    queueExplosionRender(playerState.playerLeftLocation, playerState.playerTopLocation, playerState.playerExplosion, tick);
    dispatch(setPlayerOnScreen(false));
    dispatch(removeLife());

    const spawnLocation = getShipSpawnLocation();
    dispatch(setPlayerLocationData(spawnLocation.left, spawnLocation.top));
}

/**
 * Queue an explosion center and the explosion particles.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {Explosion} explosion. An explosion asset.
 * @param {Particle[]} targetParticleArray. The array where the particles will be pushed into. Helps keep track of particles belonging to the player or an enemy.
 */
function queueExplosionRender(left: number, top: number, coloredExplosion: Explosion, tick: number): void {

    const newShrapnell = StateProviders.explosionShrapnellProvider(left, top, coloredExplosion);

    const newExplosion: ExplosionCenterState = {
        left,
        top,
        startTick: tick,
        hitbox: getFrameHitbox(left, top, coloredExplosion.explosionCenterFrame, pixelSize),
        coloredFrame: coloredExplosion.explosionCenterFrame,
    };

    dispatch(addExplosionCenter(newExplosion));
    dispatch(addParticles(newShrapnell));
}

/**
 * Increases all enemies speed.
 * @param {number} value.
 */
export function increaseEnemySpeed(value: number): void {
    localState.enemies.forEach((e) => e.ship.increaseSpeed(value));
}

//#region  Debugging

function DEBUGGING_renderHitboxes() {
    const { debuggingState, playerState, enemyLevelState } = appState();
    if (debuggingState.drawHitboxes) {
        const hitboxes = enemyLevelState.enemyState.map((e) => e.hitbox);

        // Add player if defined.
        if (playerState.playerHitbox) {
            hitboxes.push(playerState.playerHitbox);
        }

        // Add bullet if defined.
        if (playerState.playerBulletState?.hitbox) {
            hitboxes.push(playerState.playerBulletState.hitbox);
        }

        // Draw a circle around each object using the
        // coordiates and radius of the hitbox.
        for (const hitbox of hitboxes) {

            if (hitbox !== undefined) {
                const ctx = ctxProvider();
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.rect(hitbox.left, hitbox.top, hitbox.right - hitbox.left, hitbox.bottom - hitbox.top);
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

/**
 * Debugging! Draw a phaser beam towards an enemy.
 */
// function DEBUGGING_drawPhaser(): void {
//     const { debuggingState: debugging, playerState: player, enemyLevelState } = appState();
//     if (debugging.renderPhaser && Guard.isPlayerAlive(player.ship) && enemyLevelState.enemies.length > 0) {
//         const enemy = enemyLevelState.enemies[0];
//         getPhaserLocations(.getNozzleLocation().left, player.ship.getNozzleLocation().top, enemy.ship.getCenterLocation().left, enemy.ship.getCenterLocation().top, pixelSize);
//     }
// }

//#endregion
