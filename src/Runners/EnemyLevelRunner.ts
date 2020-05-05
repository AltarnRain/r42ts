/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import Guard from "../Guard";
import Explosion from "../Models/Explosion";
import { StateProviders } from "../Particles/StateProviders";
import getPhaserLocations from "../Player/GetPhaserLocations";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import renderFrame from "../Render/RenderFrame";
import { addExplosionCenter, addParticles, clearPhaserLocations, removeEnemy, setEnemies, setExplosionCenters, setPhaserLocations, setShrapnellState } from "../State/EnemyLevel/Actions";
import { ExplosionCenterState } from "../State/EnemyLevel/ExplosionCenterState";
import { increaseScore, removeLife, removePhaser, setPause } from "../State/Game/Actions";
import { setPlayerBulletState, setPlayerLocationData, setPlayerOnScreen } from "../State/Player/Actions";
import { ParticleState } from "../State/Player/ParticleState";
import { appState, dispatch } from "../State/Store";
import { Frame } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { getFrameHitbox } from "../Utility/Frame";
import { overlaps } from "../Utility/Geometry";
import { fallsWithinGameField, getLocation } from "../Utility/Location";
import { getHittableObjects } from "../Utility/StateHelper";

/**
 * Module:          EnemyLevelRunner
 * Responsibility:  Handles all state reactions and action for levels that contain enemies.
 */

const phaserFrame: Frame = [
    [CGAColors.yellow, CGAColors.yellow]
];

const {
    pixelSize,
    gameField
} = dimensionProvider();

/**
 * Runner function that can be registered in the GameLoop.
 * @param {number} tick. The current tick.
 */
export default function enemyLevelRunner(tick: number): void {
    updateState(tick);
    GameLoop.registerDraw(draw);
}

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
    enemyLevelState.enemies.forEach((e) => e.ship.draw());

    if (explosionData) {
        for (const center of explosionCenters) {
            renderFrame(center.left, center.top, explosionData.coloredExplosion.explosionCenterFrame);
        }
    }

    for (const shrapnell of enemyLevelState.shrapnell) {
        renderFrame(shrapnell.left, shrapnell.top, shrapnell.coloredFrame);
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
        enemyLevelState,
        debuggingState,
    } = appState();

    const hittableObjects = getHittableObjects(enemyLevelState);

    if (hittableObjects.length > 0) {
        for (const hittableObject of hittableObjects) {
            // In this loop the state is updated. We need to get the most
            // recent one.
            const hitdetectionPlayerState = appState().playerState;
            const hittableObjectHitbox = hittableObject.getHitbox();
            // Check if the player got hit.
            if (hitdetectionPlayerState.playerHitbox && debuggingState.playerIsImmortal === false) {
                if (overlaps(hitdetectionPlayerState.playerHitbox, hittableObjectHitbox)) {
                    // Player was hit. Render the explosion.
                    handlePlayerDeath(tick);
                }
            }

            // Check if the player hit something.
            if (hitdetectionPlayerState.playerBulletState?.hitbox && Guard.isEnemy(hittableObject)) {
                if (overlaps(hitdetectionPlayerState.playerBulletState.hitbox, hittableObjectHitbox)) {
                    dispatch(setPlayerBulletState(undefined));
                    handleEnemyDestruction(hittableObject, tick);
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
        const burnTime = explosionData.coloredExplosion.explosionCenterDelay;
        const remainingExplosions = explosionCenters.filter((ec) => ec.startTick + burnTime > tick);

        dispatch(setExplosionCenters(remainingExplosions));
    }
}

/**
 * Handles enemy state updates.
 * @param {number} tick. Current tick
 */
function handleEnemies(tick: number): void {
    appState().enemyLevelState.enemies.forEach((e) => {
        e.ship.updateState(tick);
    });
}

/**
 * Handles particles state updates.
 * @param {number} tick. Current tick.
 */
function handleShrapnell(): void {
    const particles = appState().enemyLevelState.shrapnell;
    const newState: ParticleState[] = [];

    for (const particle of particles) {
        const newSpeed = particle.speed * particle.acceletation;
        const newLocation = getLocation(particle.left, particle.top, particle.angle, newSpeed);

        if (fallsWithinGameField(newLocation.left, newLocation.top)) {
            const particleState = StateProviders.getParticleState(newLocation.left, newLocation.top, newSpeed, particle.angle, particle.coloredFrame, particle.acceletation);
            newState.push(particleState);
        }
    }

    dispatch(setShrapnellState(newState));
}

/**
 * Handle self destruct.
 */
function handleSelfDestruct(tick: number): void {
    const playerState = appState().playerState;

    if (playerState.playerOnScreen && appState().keyboardState.selfDestruct) {
        const { enemyLevelState } = appState();
        for (const enemy of enemyLevelState.enemies) {
            const center = enemy.ship.getCenterLocation();
            queueExplosionRender(center.left, center.top, enemy.ship.getExplosion(), tick);
        }

        queueExplosionRender(playerState.playerLeftLocation, playerState.playerTopLocation, playerState.playerExplosion, tick);
        handlePlayerDeath(tick);
        dispatch(setEnemies([]));
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemy} enemy.
 */
function handleEnemyDestruction(ship: BaseEnemy, tick: number): void {
    const { enemyLevelState } = appState();

    enemyLevelState.enemies.forEach((e) => {
        if (e.ship !== ship) {
            e.ship.increaseSpeed(enemyLevelState.totalNumberOfEnemies / (enemyLevelState.enemies.length - 1));
        } else {
            dispatch(removeEnemy(e.ship));
        }
    });

    const location = ship.getLocation();
    queueExplosionRender(location.left, location.top, ship.getExplosion(), tick);
    dispatch(increaseScore(ship.getPoints()));
}

/**
 * Handles the firing of a phaser charge.
 */
function handlePhaser(tick: number): void {
    const { enemyLevelState, playerState, gameState } = appState();

    if (playerState.playerNozzleLocation &&
        appState().keyboardState.phraser &&
        appState().enemyLevelState.enemies.length > 0 &&
        gameState.phasers > 0 && appState().enemyLevelState.phaserLocations.length === 0) {

        const randomEnemy = getRandomArrayElement(enemyLevelState.enemies);
        const playerNozzleLocation = playerState.playerNozzleLocation;
        const randomEnemyCenter = randomEnemy.ship.getCenterLocation();

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
            handleEnemyDestruction(randomEnemy.ship, tick);
            dispatch(clearPhaserLocations());
        }, 100);
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
    };

    dispatch(addExplosionCenter(newExplosion));
    dispatch(addParticles(newShrapnell));
}

/**
 * Increases all enemies speed.
 * @param {number} value.
 */
export function increaseEnemySpeed(value: number): void {
    appState().enemyLevelState.enemies.forEach((e) => e.ship.increaseSpeed(value));
}

//#region  Debugging

function DEBUGGING_renderHitboxes() {
    const { debuggingState, playerState, enemyLevelState } = appState();
    if (debuggingState.drawHitboxes) {
        const hitboxes = [
            ...getHittableObjects(enemyLevelState).map((e) => e.getHitbox()),
        ];

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
