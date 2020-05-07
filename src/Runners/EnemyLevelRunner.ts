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
import { addExplosionCenter, addParticles, clearPhaserLocations, removeEnemy, setBulletState, setExplosionCenters, setPhaserLocations, setShrapnellState, setTotalEnemies } from "../State/EnemyLevel/EnemyLevelActions";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { ExplosionCenterState } from "../State/EnemyLevel/ExplosionCenterState";
import { increaseScore, removeLife, removePhaser, setPause } from "../State/Game/GameActions";
import { setPlayerBulletState, setPlayerLocationData } from "../State/Player/PlayerActions";
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

    // Check if the player hit an enemy.
    enemyHitPlayerDetection();
    playerHitEnemyDetection();

    function playerHitEnemyDetection() {
        const { playerState, enemyLevelState } = appState();
        // Check if the player an enemy something.
        if (playerState.bulletState !== undefined && playerState.bulletState.hitbox !== undefined) {

            const playerBulletHitbox = playerState.bulletState.hitbox;
            const hitEnemy = enemyLevelState.enemyState.find((e) => {
                if (overlaps(playerBulletHitbox, e.hitbox)) {
                    return true;
                }
            });

            if (hitEnemy !== undefined) {
                handleEnemyDestruction(hitEnemy, tick);
                // Player hit an enemy, remove the bullet.
                dispatch(setPlayerBulletState(undefined));

            }
        }
    }

    abc(tick);

    function enemyHitPlayerDetection() {
        const { enemyLevelState, debuggingState } = appState();
        for (const enemyState of enemyLevelState.enemyState) {

            // Always pull in a fresh version of the player state since we're
            // doing dispatches within this loop that can effect the player state.
            const { playerState } = appState();
            if (enemyState.hitbox !== undefined) {
                if (playerState.alive && playerState.hitbox && debuggingState.playerIsImmortal === false) {
                    if (overlaps(playerState.hitbox, enemyState.hitbox)) {
                        // Player was hit. Render the explosion.
                        handlePlayerDeath(tick);
                    }
                }
            }
        }
    }



}

function abc(tick: number): void {
    const shrapnels = appState().enemyLevelState.shrapnell;
    const bullets = appState().enemyLevelState.bullets;

    for (const shrapnell of shrapnels) {
        const { playerState } = appState();
        if (playerState.alive && overlaps(playerState.hitbox, shrapnell.hitbox)) {
            handlePlayerDeath(tick);
            break;
        }
    }

    for (const bullet of bullets) {
        const playerState = appState().playerState;
        if (playerState.alive && overlaps(playerState.hitbox, bullet.hitbox)) {
            handlePlayerDeath(tick);
            break;
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
    const { playerState } = appState();

    if (playerState.alive && appState().keyboardState.selfDestruct) {
        for (const enemy of localState.enemies) {

            const enemyState = StateProviders.getEnemyState(enemy);
            queueExplosionRender(enemyState.offsetLeft, enemyState.offsetTop, enemyState.coloredExplosion, tick);
        }

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
        localState.enemies.length > 0 &&
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
 * handles a player's death event.
 */
function handlePlayerDeath(tick: number): void {
    const { playerState } = appState();

    queueExplosionRender(playerState.left, playerState.top, playerState.coloredExplosion, tick);
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
    localState.enemies.forEach((e) => e.increaseSpeed(value));
}

//#region  Debugging

function DEBUGGING_renderHitboxes() {
    const { debuggingState, playerState, enemyLevelState } = appState();
    if (debuggingState.drawHitboxes) {
        const hitboxes = enemyLevelState.enemyState.map((e) => e.hitbox);

        // Add player if defined.
        if (playerState.hitbox) {
            hitboxes.push(playerState.hitbox);
        }

        // Add bullet if defined.
        if (playerState.bulletState?.hitbox) {
            hitboxes.push(playerState.bulletState.hitbox);
        }

        enemyLevelState.bullets.forEach((b) => hitboxes.push(b.hitbox));
        enemyLevelState.shrapnell.forEach((b) => hitboxes.push(b.hitbox));

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
