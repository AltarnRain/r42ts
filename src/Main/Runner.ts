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
import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { Lives, Phasers, PlayerFormation, ScoreBoard } from "../Modules";
import ExplosionCenter from "../Particles/ExplosionCenter";
import Particle from "../Particles/Particle";
import { drawPhasor } from "../Player/DrawPhaser";
import PlayerBullet from "../Player/PlayerBullet";
import PlayerBulletFrame from "../Player/PlayerBulletFrame";
import PlayerShip from "../Player/PlayerShip";
import CtxProvider from "../Providers/CtxProvider";
import DimensionProvider from "../Providers/DimensionProvider";
import particleProvider from "../Providers/ParticleProvider";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { appState, dispatch } from "../State/Store";
import { PlayerFormationPhases } from "../Types/Types";
import { getRandomArrayElement } from "../Utility/Array";
import { overlaps } from "../Utility/Geometry";

let drawHandle: number | undefined;

/**
 * Runs the main game loop.
 * @param {number} tick. The current tick.
 */
export function run(tick: number): void {
    // Always update the state before drawing on the canvas. This means
    // the player is seeing the latest version of the game's state
    // and it will feel much more accurate. It also
    // means the game will not render objects that are about to be removed from the game's
    // For example, explosions and particles that moved out of the game's playing field.
    updateState(tick);

    // Drawing is async. Don't draw when there's a draw is process. Keep calculating the
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

    const { playerState, levelState, debuggingState, gameState, keyboardState } = appState();

    if (playerState.playerFormationPhase === "begin" && levelState.particles.length === 0) {

        dispatch<PlayerFormationPhases>("setPlayerFormationPhase", "inprogress");

        PlayerFormation.formSlow(getShipSpawnLocation(), () => {
            dispatch<PlayerShip>("setPlayer", new PlayerShip());
            dispatch<PlayerFormationPhases>("setPlayerFormationPhase", undefined);
        });
    }

    if (playerState.playerFormationPhase === "inprogress") {
        PlayerFormation.updateState();
    }

    // Update object states.
    levelState.enemies.forEach((e) => e.updateState(tick));
    playerState.ship?.updateState();
    playerState.playerBullet?.updateState();

    // Remove objects no longer required.
    if (playerState.playerBullet?.traveling() === false) {
        dispatch<PlayerBullet>("setBullet", undefined);
    }

    // Update state and remove particles that are done traveling.
    levelState.particles.forEach((p) => {
        if (p.traveling()) {
            p.updateState(tick);
        } else {
            dispatch<BaseParticle>("removeParticle", p);
        }
    });

    // Update explosion center state and remove if they're done burning.
    levelState.explosionCenters.filter((ec) => {
        if (ec.burning()) {
            ec.updateState(tick);
            return true;
        } else {
            dispatch<ExplosionCenter>("removeExplosionCenter", ec);
        }
    });

    // Keyboard events.
    if (playerIsAlive(playerState.ship) && keyboardState.selfDestruct) {
        for (const enemy of levelState.enemies) {
            queueExplosionRender(enemy.getCenterLocation(), enemy.getExplosion());
        }

        queueExplosionRender(playerState.playerLocation, playerState.ship.getExplosion());

        dispatch<PlayerShip>("setPlayer", undefined);
        dispatch<BaseEnemyObject[]>("setEnemies", []);
    }

    // Hit a random enemy with a phasor.
    // In order to fire a phaser there must be enemies, the player must have a phaser charge, a phaser cannot
    // currently being fired (=on screen) and the player must be alive.
    if (playerIsAlive(playerState.ship) &&
        keyboardState.phraser &&
        levelState.enemies.length > 0 &&
        gameState.phasers > 0 && levelState.phaserOnScreen === false) {
        handlePhaser(playerState.ship);
    }

    if (playerIsAlive(playerState.ship) && keyboardState.fire && playerState.playerBullet === undefined) {
        dispatch<PlayerBullet>("setBullet", new PlayerBullet(PlayerBulletFrame.F0, 270, 30, 1, playerState.ship.getNozzleLocation()));
    }

    // Hit detection.
    const hittableObjects = getHittableObjects();

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
                    dispatch<PlayerBullet>("setBullet", undefined);
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
    const { levelState: level, playerState: player } = appState();
    if (level.pause) {
        return;
    }

    // Begin by drawing a black rectangle on the game field before drawing game objects.
    // This MUST be done here before the game objects are drawn otherwise
    // this function might fire at the wrong time and clear the game field.
    clearGameFieldBackground();

    // Draw all the game objects
    player.ship?.draw();
    level.enemies.forEach((e) => e.draw());
    level.particles.forEach((p) => p.draw());
    level.explosionCenters.forEach((ec) => ec.draw());
    player.playerBullet?.draw();

    if (player.playerFormationPhase === "inprogress") {
        PlayerFormation.draw();
    }

    DEBUGGING_drawPhasor();

    // Debugging. Show the hitboxes on screen.
    DEBUGGING_renderHitboxes();

    // drawGrid();
}

function DEBUGGING_drawPhasor() {
    const { debuggingState: debugging, playerState: player, levelState: level } = appState();
    if (debugging.renderPhaser && playerIsAlive(player.ship) && level.enemies.length > 0) {
        const enemy = level.enemies[0];
        drawPhasor(player.ship.getNozzleLocation(), enemy.getCenterLocation(), DimensionProvider().averagePixelSize);
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemyObject} enemy.
 */
function handleEnemyDestruction(enemy: BaseEnemyObject) {
    const { levelState: level } = appState();
    const remainingEnemies = level.enemies.length - 1;
    level.enemies.forEach((e) => {
        if (e !== enemy) {
            e.increaseSpeed(level.numberOfEnemies / remainingEnemies);
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
    const { levelState: level } = appState();

    // Prevent accidental double phasors when the player holds the button to long.
    level.phaserOnScreen = true;

    const randomEnemy = getRandomArrayElement(level.enemies);
    const playerNozzleLocation = player.getNozzleLocation();
    const randomEnemyCenter = randomEnemy.getCenterLocation();

    // Remove one phaser.
    dispatch("removePhaser");
    drawPhasor(playerNozzleLocation, randomEnemyCenter, DimensionProvider().maxPixelSize);

    // Pause the game for a very brief period. This is what the original game did
    // when you fired a phasor shot.
    level.pause = true;
    window.setTimeout(() => {
        // Unpause the game to let rendering continue.
        level.pause = false;
        level.phaserOnScreen = false;

        // Deal the with the enemy that got hit.
        handleEnemyDestruction(randomEnemy);
    }, 100);
}

/**
 * handles a player's death event.
 * @param {PlayerShip} player. Player object.
 */
function handlePlayerDeath(player: PlayerShip): void {

    const { playerState, gameState } = appState();

    queueExplosionRender(playerState.playerLocation, player.getExplosion());
    dispatch<PlayerShip>("setPlayer", undefined);
    dispatch("removeLife");

    if (gameState.lives > 0) {
        dispatch<PlayerFormationPhases>("setPlayerFormationPhase", "inprogress");
    } else {
        // TODO: handle game over.
    }
}

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
function getHittableObjects(): BaseGameObject[] {
    const {levelState} = appState();
    return [
        ...levelState.enemies,
        ...levelState.particles,
        ...levelState.explosionCenters
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
    appState().levelState.enemies.forEach((e) => e.increaseSpeed(value));
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
    const {debuggingState, playerState} = appState();
    if (debuggingState.drawHitboxes) {
        const hittableObjects = [
            ...getHittableObjects(),
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
