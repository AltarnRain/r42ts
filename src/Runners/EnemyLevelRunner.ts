/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import getPhaserLocations from "../Player/GetPhaserLocations";
import { playerIsHit } from "../Player/PlayerHelper";
import dimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { clearPhaserLocations, removeEnemy, setPhaserLocations, setTotalEnemies } from "../State/EnemyLevel/EnemyLevelActions";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { increaseScore, removePhaser, setPause } from "../State/Game/GameActions";
import { ParticleState } from "../State/Player/ParticleState";
import { setPlayerBulletState } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import { dispatchExplosion } from "../StateHandlers/DispatchExplosion";
import { handlePlayerDeath } from "../StateHandlers/HandlePlayerDeath";
import { Frame } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { overlaps } from "../Utility/Geometry";

/**
 * Module:          EnemyLevelRunner
 * Responsibility:  Handles all state reactions and action for levels that contain enemies.
 */

/**
 * Array of current game objects on screen.
 */

const localState: { enemies: BaseEnemy[] } = {
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

    export function setEnemies(newEnemies: BaseEnemy[]): void {
        localState.enemies = newEnemies;
        dispatch(setTotalEnemies(newEnemies.length));
    }

    export function addEnemy(newEnemy: BaseEnemy): void {
        localState.enemies.push(newEnemy);
    }
}

export default EnemyLevelRunner;

/**
 * Handles all level state changes.
 * @param {number} tick. Current tick.
 */
function updateState(tick: number) {
    handleSelfDestruct(tick);
    handlePhaser(tick);
    handleEnemies(tick);
    handleHitDetection(tick);
}

/**
 * Draws all objects part of the level but not the player.
 * @param {number} tick. Tick.
 */
function draw(): void {
    const { enemies, bullets, phaserLocations } = appState().enemyLevelState;

    // Draw all the game objects
    for (const enemyState of enemies) {
        if (enemyState.currentFrame !== undefined) {
            renderFrame(enemyState.offsetLeft, enemyState.offsetTop, enemyState.currentFrame);
        }
    }

    for (const bullet of bullets) {
        renderFrame(bullet.left, bullet.top, bullet.coloredFrame);
    }

    phaserLocations.forEach((pf) => renderFrame(pf.left, pf.top, phaserFrame));
}

/**
 * Handles all hit detection.
 */
function handleHitDetection(tick: number) {

    // Check if the player was hit.
    enemyHitPlayerDetection(tick);

    // Check if the player hit anything
    playerHitEnemyDetection(tick);

    // Check if the player was hit by shrapnell.
    playerHitByParticle(tick, appState().enemyLevelState.shrapnells);

    // Check if the player was hit by a bullet.
    playerHitByParticle(tick, appState().enemyLevelState.bullets);
}

/**
 * Check if the player hit an enemy.
 * @param {number} tick. Current tick.
 */
function playerHitEnemyDetection(tick: number) {
    const { playerState, enemyLevelState } = appState();
    if (playerState.bulletState !== undefined && playerState.bulletState.hitbox !== undefined) {

        const playerBulletHitbox = playerState.bulletState.hitbox;
        const hitEnemy = enemyLevelState.enemies.find((e) => {
            if (overlaps(playerBulletHitbox, e.hitbox)) {
                return true;
            }
        });

        if (hitEnemy !== undefined) {
            handleEnemyHitByplayer(tick, hitEnemy);

            dispatch(setPlayerBulletState(undefined));
        }
    }
}

/**
 * Handles the actions that can occur of the player hits a enemy.
 * @param {number} tick. Current tick
 * @param {EnemyState} hitEnemy. Enemy hit by the player.
 */
function handleEnemyHitByplayer(tick: number, hitEnemy: EnemyState): void {
    if (hitEnemy.hitpoints === 1) {
        handleEnemyDestruction(tick, hitEnemy);
    } else {
        const enemy = localState.enemies.find((e) => e.getId() === hitEnemy.enemyId);
        if (enemy) {
            enemy.recudeHitpoints();
        }
    }
}

/**
 * Check if an enemy physically hit the player.
 * @param {number} tick. Current tick.
 */
function enemyHitPlayerDetection(tick: number) {
    const { enemyLevelState, playerState } = appState();
    if (playerState.alive) {
        const hit = enemyLevelState.enemies.some((e) => playerIsHit(playerState.hitboxes, e.hitbox));

        if (hit) {
            handlePlayerDeath(tick);
        }
    }
}

/**
 * Check if the player was hit by a particle. This can be an enemy bullet or a piece of shrapnell.
 * @param {number} tick. Current tuck
 * @param {ParticleState[]} particles. Particles.
 */
function playerHitByParticle(tick: number, particles: ParticleState[]): void {

    const { playerState } = appState();
    if (playerState.alive) {
        const hit = particles.some((e) => playerIsHit(playerState.hitboxes, e.hitbox));

        if (hit) {
            handlePlayerDeath(tick);
        }
    }
}

/**
 * Handles enemy state updates.
 * @param {number} tick. Current tick
 */
function handleEnemies(tick: number): void {
    localState.enemies.forEach((e) => {
        e.updateState(tick);
    });
}

/**
 * Handle self destruct.
 */
function handleSelfDestruct(tick: number): void {
    const { playerState, enemyLevelState } = appState();

    if (playerState.alive && appState().keyboardState.selfDestruct) {
        handlePlayerDeath(tick);
        enemyLevelState.enemies.forEach((es) => handleEnemyDestruction(tick, es));
        localState.enemies = [];
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemy} enemy.
 */
function handleEnemyDestruction(tick: number, enemy: EnemyState): void {
    const { enemyLevelState } = appState();

    localState.enemies = localState.enemies.filter((e) => {
        if (e.getId() !== enemy.enemyId) {
            e.increaseSpeed(enemyLevelState.totalNumberOfEnemies / (localState.enemies.length - 1));
            return true;
        } else {
            return false;
        }
    });

    dispatchExplosion(enemy.offsetLeft, enemy.offsetTop, enemy.coloredExplosion, tick);
    dispatch(removeEnemy(enemy.enemyId));
    dispatch(increaseScore(enemy.points));
}

/**
 * Handles the firing of a phaser charge.
 */
function handlePhaser(tick: number): void {
    const { enemyLevelState, playerState, gameState, keyboardState } = appState();

    if (playerState.alive &&
        playerState.nozzleLocation &&
        keyboardState.phraser &&
        enemyLevelState.enemies.length > 0 &&
        gameState.phasers > 0 &&
        enemyLevelState.phaserLocations.length === 0) {

        const randomEnemy = getRandomArrayElement(enemyLevelState.enemies);
        const playerNozzleLocation = playerState.nozzleLocation;
        const randomEnemyCenter = randomEnemy.centerLocation;
        if (randomEnemyCenter !== undefined) {
            // Remove one phaser.
            dispatch(removePhaser());
            const phaserLocations = getPhaserLocations(playerNozzleLocation.left, playerNozzleLocation.top, randomEnemyCenter.left, randomEnemyCenter.top);
            dispatch(setPhaserLocations(phaserLocations));

            // Pause the game for a very brief period. This is what the original game did
            // when you fired a phasor shot.
            dispatch(setPause(true));
            window.setTimeout(() => {
                // Unpause the game to let rendering continue.
                dispatch(setPause(false));

                // Deal the with the enemy that got hit.

                handleEnemyHitByplayer(tick, randomEnemy);
                dispatch(clearPhaserLocations());
            }, 100);
        }
    }
}