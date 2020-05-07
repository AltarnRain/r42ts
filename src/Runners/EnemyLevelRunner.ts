/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import Explosion from "../Models/Explosion";
import getPhaserLocations from "../Player/GetPhaserLocations";
import dimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { addExplosionCenter, clearPhaserLocations, removeEnemy, setBulletState, setExplosionCenters, setPhaserLocations, setShrapnellState, setTotalEnemies } from "../State/EnemyLevel/EnemyLevelActions";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { ExplosionCenterState } from "../State/EnemyLevel/ExplosionCenterState";
import { increaseScore, removeLife, removePhaser, setPause } from "../State/Game/GameActions";
import { ParticleState } from "../State/Player/ParticleState";
import { setPlayerBulletState, setPlayerIsAlive } from "../State/Player/PlayerActions";
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
    const { explosionCenters } = enemyLevelState;

    // Draw all the game objects
    for (const enemyState of enemyLevelState.enemyState) {
        if (enemyState.currentFrame !== undefined) {
            renderFrame(enemyState.offsetLeft, enemyState.offsetTop, enemyState.currentFrame);
        }
    }

    for (const center of explosionCenters) {
        renderFrame(center.left, center.top, center.coloredFrame);
    }

    for (const shrapnell of enemyLevelState.shrapnell) {
        renderFrame(shrapnell.left, shrapnell.top, shrapnell.coloredFrame);
    }

    for (const bullet of enemyLevelState.bullets) {
        renderFrame(bullet.left, bullet.top, bullet.coloredFrame);
    }

    enemyLevelState.phaserLocations.forEach((pf) => renderFrame(pf.left, pf.top, phaserFrame));
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
    playerHitByParticle(tick, appState().enemyLevelState.shrapnell);

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
        const hitEnemy = enemyLevelState.enemyState.find((e) => {
            if (overlaps(playerBulletHitbox, e.hitbox)) {
                return true;
            }
        });

        if (hitEnemy !== undefined) {
            handleEnemyDestruction(hitEnemy, tick);
            dispatch(setPlayerBulletState(undefined));
        }
    }
}

/**
 * Check if an enemy physically hit the player.
 * @param {number} tick. Current tick.
 */
function enemyHitPlayerDetection(tick: number) {
    const { enemyLevelState, debuggingState, playerState } = appState();
    if (playerState.alive && playerState.hitbox !== undefined && debuggingState.playerIsImmortal === false) {
        const playerIsHit = enemyLevelState.enemyState.some((e) => overlaps(playerState.hitbox, e.hitbox));

        if (playerIsHit) {
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

    const { playerState, debuggingState } = appState();
    if (playerState.alive && playerState.hitbox !== undefined && debuggingState.playerIsImmortal === false) {
        const playerIsHit = particles.some((e) => overlaps(playerState.hitbox, e.hitbox));

        if (playerIsHit) {
            handlePlayerDeath(tick);
        }
    }
}

/**
 * Handles explosion centers.
 * @param {number} tick. Current tick
 */
function handleExplosionCenters(tick: number): void {
    const { explosionCenters } = appState().enemyLevelState;

    const remainingExplosions = explosionCenters.filter((ec) => ec.startTick + ec.explosionCenterDelay > tick);
    dispatch(setExplosionCenters(remainingExplosions));
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
    const { playerState, enemyLevelState } = appState();

    if (playerState.alive && appState().keyboardState.selfDestruct) {
        enemyLevelState.enemyState.forEach((es) => queueExplosionRender(es.offsetLeft, es.offsetTop, es.coloredExplosion, tick));
        queueExplosionRender(playerState.left, playerState.top, playerState.coloredExplosion, tick);
        handlePlayerDeath(tick);
        localState.enemies = [];
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemy} enemy.
 */
function handleEnemyDestruction(enemy: EnemyState, tick: number): void {
    const { enemyLevelState } = appState();

    localState.enemies = localState.enemies.filter((e) => {
        if (e.getId() !== enemy.enemyId) {
            e.increaseSpeed(enemyLevelState.totalNumberOfEnemies / (localState.enemies.length - 1));
            return true;
        } else {
            return false;
        }
    });

    queueExplosionRender(enemy.offsetLeft, enemy.offsetTop, enemy.coloredExplosion, tick);
    dispatch(removeEnemy(enemy.enemyId));
    dispatch(increaseScore(enemy.points));
}

/**
 * Handles the firing of a phaser charge.
 */
function handlePhaser(tick: number): void {
    const { enemyLevelState, playerState, gameState, keyboardState } = appState();

    if (playerState.nozzleLocation &&
        keyboardState.phraser &&
        enemyLevelState.enemyState.length > 0 &&
        gameState.phasers > 0 &&
        enemyLevelState.phaserLocations.length === 0) {

        const randomEnemy = getRandomArrayElement(enemyLevelState.enemyState);
        const playerNozzleLocation = playerState.nozzleLocation;
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

                handleEnemyDestruction(randomEnemy, tick);
                dispatch(clearPhaserLocations());
            }, 100);
        }
    }
}

/**
 * Handles a the player's death.
 * @param {number} tick
 */
function handlePlayerDeath(tick: number): void {
    const { playerState } = appState();
    queueExplosionRender(playerState.left, playerState.top, playerState.coloredExplosion, tick);

    dispatch(removeLife());
    dispatch(setPlayerIsAlive(false));
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
        explosionCenterDelay: coloredExplosion.explosionCenterDelay,
    };

    dispatch(addExplosionCenter(newExplosion, newShrapnell));
}