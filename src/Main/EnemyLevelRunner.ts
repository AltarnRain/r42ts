/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import Immobile from "../LocationProviders/Immobile";
import Explosion from "../Models/Explosion";
import ExplosionCenter from "../Particles/ExplosionCenter";
import Particle from "../Particles/Particle";
import getPhaserLocations from "../Player/GetPhaserLocations";
import PlayerShip from "../Player/PlayerShip";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import particleProvider from "../Providers/ParticleProvider";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import renderFrame from "../Render/RenderFrame";
import { addExplosionCenter, addParticles, clearPhaserLocations, removeEnemy, removeExplosionCenter, removeParticle, setEnemies, setPhaserLocations } from "../State/EnemyLevel/Actions";
import { increaseScore, removeLife, removePhaser, setPause } from "../State/Game/Actions";
import { setBullet, setPlayer, setPlayerLocation } from "../State/Player/Actions";
import { appState, dispatch } from "../State/Store";
import { Frame } from "../Types/Types";
import { getRandomArrayElement } from "../Utility/Array";
import { getExplosionReturner, getFrameReturner } from "../Utility/Frame";
import { overlaps } from "../Utility/Geometry";
import { getHittableObjects } from "../Utility/StateHelper";
import GameLoop from "./GameLoop";

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
    const { playerState, enemyLevelState, debuggingState, gameState, keyboardState } = appState();

    if (gameState.pause) {
        return;
    }

    // Update object states.
    enemyLevelState.enemies.forEach((e) => {
        e.ship.updateState(tick);
    });

    // SelfDestruct
    if (playerIsAlive(playerState.ship) && keyboardState.selfDestruct) {
        for (const enemy of enemyLevelState.enemies) {
            const center = enemy.ship.getCenterLocation();
            queueExplosionRender(center.left, center.top, enemy.ship.getExplosion());
        }

        queueExplosionRender(playerState.playerLeftLocation, playerState.playerTopLocation, playerState.ship.getExplosion());

        dispatch(setPlayer(undefined));
        dispatch(setEnemies([]));
    }

    // Hit a random enemy with a phasor.
    // In order to fire a phaser there must be enemies, the player must have a phaser charge, a phaser cannot
    // currently being fired (=on screen) and the player must be alive.
    if (playerIsAlive(playerState.ship) &&
        keyboardState.phraser &&
        enemyLevelState.enemies.length > 0 &&
        gameState.phasers > 0 && enemyLevelState.phaserLocations.length === 0) {
        handlePhaser(playerState.ship);
    }

    // Update state and remove particles that are done traveling.
    enemyLevelState.particles.forEach((p) => {
        if (p.traveling()) {
            p.updateState(tick);
        } else {
            dispatch(removeParticle(p));
        }
    });

    // Update explosion center state and remove if they're done burning.
    enemyLevelState.explosionCenters.forEach((ec) => {
        if (ec.burning()) {
            ec.updateState(tick);
        } else {
            dispatch(removeExplosionCenter(ec));
        }
    });

    // Hit detection.
    const hittableObjects = getHittableObjects(enemyLevelState);

    // There's stuff that can get hit or hit something.
    if (hittableObjects.length > 0) {
        for (const hittableObject of hittableObjects) {

            const hittableObjectHitbox = hittableObject.getHitbox();

            // Check if the player got hit.
            if (playerIsAlive(playerState.ship) && debuggingState.playerIsImmortal === false) {
                if (overlaps(playerState.ship.getHitbox(), hittableObjectHitbox)) {

                    // Player was hit. Render the explosion.
                    handlePlayerDeath(playerState.ship);
                }
            }

            // Check if the player hit something.
            if (playerState.playerBullet !== undefined && isEnemy(hittableObject)) {
                if (overlaps(playerState.playerBullet.getHitbox(), hittableObjectHitbox)) {
                    dispatch(setBullet(undefined));
                    handleEnemyDestruction(hittableObject);
                }
            }
        }
    }
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
function handlePhaser(player: PlayerShip): void {
    const { enemyLevelState } = appState();

    const randomEnemy = getRandomArrayElement(enemyLevelState.enemies);
    const playerNozzleLocation = player.getNozzleLocation();
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

/**
 * handles a player's death event.
 * @param {PlayerShip} player. Player object.
 */
function handlePlayerDeath(player: PlayerShip): void {
    const { playerState } = appState();

    queueExplosionRender(playerState.playerLeftLocation, playerState.playerTopLocation, player.getExplosion());
    dispatch(setPlayer(undefined));
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

    const immobile = new Immobile(left, top);
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
function isEnemy(value: any): value is BaseEnemy {
    return value && value.getObjectType() === "enemy";
}

// #endregion

//#region  Debugging

function DEBUGGING_renderHitboxes() {
    const { debuggingState, playerState, enemyLevelState } = appState();
    if (debuggingState.drawHitboxes) {
        const hittableObjects = [
            ...getHittableObjects(enemyLevelState),
        ];

        // Add player if defined.
        if (playerState) {
            hittableObjects.push(playerState as any);
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
    if (debugging.renderPhaser && playerIsAlive(player.ship) && enemyLevelState.enemies.length > 0) {
        const enemy = enemyLevelState.enemies[0];
        getPhaserLocations(player.ship.getNozzleLocation().left, player.ship.getNozzleLocation().top, enemy.ship.getCenterLocation().left, enemy.ship.getCenterLocation().top, averagePixelSize);
    }
}

//#endregion
