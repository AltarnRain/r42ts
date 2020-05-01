/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import Guard from "../Guard";
import ImmobileLocationProvider from "../LocationProviders/ImmobileLocationProvider";
import Explosion from "../Models/Explosion";
import ExplosionCenter from "../Particles/ExplosionCenter";
import getPhaserLocations from "../Player/GetPhaserLocations";
import PlayerShip from "../Player/PlayerShip";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import particleProvider from "../Providers/ParticleProvider";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import renderFrame from "../Render/RenderFrame";
import { addExplosionCenter, addParticles, clearPhaserLocations, removeEnemy, removeExplosionCenter, removeParticle, setEnemies, setPhaserLocations } from "../State/EnemyLevel/Actions";
import { increaseScore, removeLife, removePhaser, setPause } from "../State/Game/Actions";
import { playerDied, removePlayerBullet, setPlayerLocation } from "../State/Player/Actions";
import { appState, dispatch } from "../State/Store";
import { Frame } from "../Types";
import { getRandomArrayElement } from "../Utility/Array";
import { getExplosionReturner, getFrameReturner } from "../Utility/Frame";
import { overlaps } from "../Utility/Geometry";
import { getHittableObjects } from "../Utility/StateHelper";

/**
 * Module:          EnemyLevelRunner
 * Responsibility:  Handles all state reactions and action for levels that contain enemies.
 */

const phaserFrame: Frame = [
    [CGAColors.yellow, CGAColors.yellow]
];

const {
    maxPixelSize,
    averagePixelSize
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

    handleSelfDestruct();
    handlePhaser();
    handleParticles(tick);
    handleEnemies(tick);
    handleExplosionCenters(tick);
    handleHitDetection();
}

/**
 * Draws all objects part of the level but not the player.
 * @param {number} tick. Tick.
 */
function draw(): void {
    const { enemyLevelState } = appState();

    // Draw all the game objects
    enemyLevelState.enemies.forEach((e) => e.ship.draw());
    enemyLevelState.particles.forEach((p) => p.draw());
    enemyLevelState.explosionCenters.forEach((ec) => ec.draw());
    enemyLevelState.phaserLocations.forEach((pf) => renderFrame(pf.left, pf.top, phaserFrame));

    DEBUGGING_drawPhaser();

    // Debugging. Show the hitboxes on screen.
    DEBUGGING_renderHitboxes();

    // drawGrid();
}

/**
 * Handles all hit detection.
 */
function handleHitDetection() {
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
            if (Guard.isPlayerAlive(hitdetectionPlayerState.ship) && debuggingState.playerIsImmortal === false) {
                if (overlaps(hitdetectionPlayerState.ship.getHitbox(), hittableObjectHitbox)) {
                    // Player was hit. Render the explosion.
                    handlePlayerDeath(hitdetectionPlayerState.ship);
                }
            }
            // Check if the player hit something.
            if (Guard.isPlayerBulletActive(hitdetectionPlayerState.playerBullet) && Guard.isEnemy(hittableObject)) {
                if (overlaps(hitdetectionPlayerState.playerBullet.getHitbox(), hittableObjectHitbox)) {
                    dispatch(removePlayerBullet());
                    handleEnemyDestruction(hittableObject);
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
    const currentExplosionCenterState = appState().enemyLevelState.explosionCenters;
    currentExplosionCenterState.forEach((ec) => {
        if (ec.burning()) {
            ec.updateState(tick);
        } else {
            dispatch(removeExplosionCenter(ec));
        }
    });
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
function handleParticles(tick: number): void {
    const particles = appState().enemyLevelState.particles;
    // Update state and remove particles that are done traveling.
    particles.forEach((p) => {
        if (p.traveling()) {
            p.updateState(tick);
        } else {
            dispatch(removeParticle(p));
        }
    });
}

/**
 * Handle self destruct.
 */
function handleSelfDestruct(): void {
    const selfDestructPlayerState = appState().playerState;
    if (Guard.isPlayerAlive(selfDestructPlayerState.ship) && appState().keyboardState.selfDestruct) {
        const { enemyLevelState } = appState();
        for (const enemy of enemyLevelState.enemies) {
            const center = enemy.ship.getCenterLocation();
            queueExplosionRender(center.left, center.top, enemy.ship.getExplosion());
        }
        queueExplosionRender(selfDestructPlayerState.playerLeftLocation, selfDestructPlayerState.playerTopLocation, selfDestructPlayerState.ship.getExplosion());
        dispatch(playerDied());
        dispatch(setEnemies([]));
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemy} enemy.
 */
function handleEnemyDestruction(ship: BaseEnemy): void {
    const { enemyLevelState } = appState();
    enemyLevelState.enemies.forEach((e) => {
        if (e.ship !== ship) {
            e.ship.increaseSpeed(enemyLevelState.totalNumberOfEnemies / (enemyLevelState.enemies.length - 1));
        } else {
            dispatch(removeEnemy(e.ship));
        }
    });

    const location = ship.getLocation();
    queueExplosionRender(location.left, location.top, ship.getExplosion());
    dispatch(increaseScore(ship.getPoints()));
}

/**
 * Handles the firing of a phaser charge.
 * @param {PlayerShip} player. Player object
 */
function handlePhaser(): void {
    const { enemyLevelState, playerState, gameState } = appState();

    if (Guard.isPlayerAlive(playerState.ship) &&
        appState().keyboardState.phraser &&
        appState().enemyLevelState.enemies.length > 0 &&
        gameState.phasers > 0 && appState().enemyLevelState.phaserLocations.length === 0) {

        const randomEnemy = getRandomArrayElement(enemyLevelState.enemies);
        const playerNozzleLocation = playerState.ship.getNozzleLocation();
        const randomEnemyCenter = randomEnemy.ship.getCenterLocation();

        // Remove one phaser.
        dispatch(removePhaser());
        const phaserLocations = getPhaserLocations(playerNozzleLocation.left, playerNozzleLocation.top, randomEnemyCenter.left, randomEnemyCenter.top, maxPixelSize);
        dispatch(setPhaserLocations(phaserLocations));

        // Pause the game for a very brief period. This is what the original game did
        // when you fired a phasor shot.
        dispatch(setPause(true));
        window.setTimeout(() => {
            // Unpause the game to let rendering continue.
            dispatch(setPause(false));

            // Deal the with the enemy that got hit.
            handleEnemyDestruction(randomEnemy.ship);
            dispatch(clearPhaserLocations());
        }, 100);
    }
}

/**
 * handles a player's death event.
 * @param {PlayerShip} player. Player object.
 */
function handlePlayerDeath(player: PlayerShip): void {
    const { playerState } = appState();

    queueExplosionRender(playerState.playerLeftLocation, playerState.playerTopLocation, player.getExplosion());
    dispatch(playerDied());
    dispatch(removeLife());

    const spawnLocation = getShipSpawnLocation();
    dispatch(setPlayerLocation(spawnLocation.left, spawnLocation.top));
}

/**
 * Queue an explosion center and the explosion particles.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {Explosion} explosion. An explosion asset.
 * @param {Particle[]} targetParticleArray. The array where the particles will be pushed into. Helps keep track of particles belonging to the player or an enemy.
 */
function queueExplosionRender(left: number, top: number, explosion: Explosion): void {

    const immobile = new ImmobileLocationProvider(left, top);
    const center = new ExplosionCenter(immobile, getFrameReturner(explosion.explosionCenterFrame), explosion.explosionCenterDelay);
    const newParticles = particleProvider(left, top, getExplosionReturner(explosion));

    dispatch(addExplosionCenter(center));
    dispatch(addParticles(newParticles));
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
        const hittableObjects = [
            ...getHittableObjects(enemyLevelState),
        ];

        // Add player if defined.
        if (playerState.ship) {
            hittableObjects.push(playerState.ship);
        }

        // Add bullet if defined.
        if (playerState.playerBullet) {
            hittableObjects.push(playerState.playerBullet);
        }

        // Draw a circle around each object using the
        // coordiates and radius of the hitbox.
        for (const hittableObject of hittableObjects) {
            const hitbox = hittableObject.getHitbox();
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
function DEBUGGING_drawPhaser(): void {
    const { debuggingState: debugging, playerState: player, enemyLevelState } = appState();
    if (debugging.renderPhaser && Guard.isPlayerAlive(player.ship) && enemyLevelState.enemies.length > 0) {
        const enemy = enemyLevelState.enemies[0];
        getPhaserLocations(player.ship.getNozzleLocation().left, player.ship.getNozzleLocation().top, enemy.ship.getCenterLocation().left, enemy.ship.getCenterLocation().top, averagePixelSize);
    }
}

//#endregion
