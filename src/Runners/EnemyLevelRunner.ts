/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../Base/BaseEnemy";
import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import getPhaserLocations from "../Player/GetPhaserLocations";
import playerIsHit from "../Player/PlayerHelper";
import renderFrame from "../Render/RenderFrame";
import { SoundPlayer } from "../Sound/SoundPlayer";
import { clearPhaserLocations, removeEnemy, setEnemiesState, setPhaserLocations, setTotalEnemies } from "../State/EnemyLevel/EnemyLevelActions";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { enemeyHit as enemyHit, increaseScore, phaserFired, removePhaser, resetScore, setPause } from "../State/Game/GameActions";
import { ParticleState } from "../State/ParticleState";
import { setPlayerBulletState } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import dispatchExplosion from "../StateHandlers/DispatchExplosion";
import handlePlayerDeath from "../StateHandlers/HandlePlayerDeath";
import { getRandomArrayElement } from "../Utility/Array";
import { overlaps } from "../Utility/Geometry";

/**
 * Module:          EnemyLevelRunner
 * Responsibility:  Handles all state reactions and action for levels that contain enemies.
 */

/**
 * Array of current game objects on screen. This is the only array in the entire game thar holds BaseEnemy objects.
 */
const localState: { enemies: BaseEnemy[] } = {
    enemies: [],
};

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

        // Precoution. Ensure each enemy dispatches its state to the store
        // This is not strictly required since the enemy level runner will
        // activate while the player is forming an call update state
        // for all enemies. However, when the game is over
        // this can cause some 'issues'.
        const enemyStates = newEnemies.map((e) => e.getCurrentEnemyState());
        dispatch(setEnemiesState(enemyStates));
    }

    export function addEnemy(newEnemy: BaseEnemy): void {
        localState.enemies.push(newEnemy);
    }
}

export default EnemyLevelRunner;

/**
 * Handles all enemy level state changes.
 * @param {number} tick. Current tick.
 */
function updateState(tick: number) {
    handleSelfDestruct(tick);
    handlePhaser(tick);
    handleEnemies(tick);
    handleHitDetection(tick);
}

/**
 * Draws all enemies and enemy bullets. Also draws the phaser. Since the phaser can only be used in a level with Enemies.
 * @param {number} tick. Current game Tick.
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

    phaserLocations.forEach((pf) => renderFrame(pf.left, pf.top, [[CGAColors.yellow, CGAColors.yellow]]));
}

/**
 * Handles all hit detection.
 * @param {number} tick. Current game tick
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
            // Keep track how often the player hits an enemy.
            // A hit is a hit, even if the enemy is not detroyed.
            dispatch(enemyHit());
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

    // Use a map to update the state and then return the enemy state.
    // This way we can iterate over the enemies once and get their updated state
    // in one go.
    const newEnemiesState = localState.enemies.map((e) => {
        e.updateState(tick);
        return e.getCurrentEnemyState();
    });

    // Update the enemy level state with the current enemies. This
    // will automatically remove any enemies that were destroyed.
    dispatch(setEnemiesState(newEnemiesState));
}

/**
 * Handle self destruct.
 * @param {number} tick. Current tick.
 */
function handleSelfDestruct(tick: number): void {
    const { playerState, enemyLevelState } = appState();

    if (playerState.alive && appState().keyboardState.selfDestruct) {
        handlePlayerDeath(tick);
        enemyLevelState.enemies.forEach((es) => handleEnemyDestruction(tick, es, false));
        localState.enemies = [];

        // Score is set to 0 when the player self destructs.
        dispatch(resetScore());
    }
}

/**
 * handles the destruction of an enemy.
 * @param {BaseEnemy} enemy.
 * @param {EnemyState} enemy. The enemy that got hit.
 * @param {boolean} awardPoints. True by default. When false does not award points for destroyed enemies. Used when using self destruct.
 */
function handleEnemyDestruction(tick: number, enemy: EnemyState, awardPoints = true): void {
    const { enemyLevelState } = appState();

    // Get the enemies that are not destroyed and increase the remaining enemies speed in one go.
    localState.enemies = localState.enemies.filter((e) => {
        if (e.getId() !== enemy.enemyId) {
            e.increaseSpeed(enemyLevelState.totalNumberOfEnemies / (localState.enemies.length - 1));
            return true;
        } else {
            return false;
        }
    });

    SoundPlayer.enemyExplosion();
    dispatchExplosion(enemy.offsetLeft, enemy.offsetTop, enemy.coloredExplosion, tick);
    dispatch(removeEnemy(enemy.enemyId));

    // True by default but self destruct gives no points.
    if (awardPoints) {
        dispatch(increaseScore(enemy.points));
    }

    // Keep track how often the player hits an enemy. This is a different dispatch because
    // tracking hits is registered in the GameState, not the EnemyLevelState.
    dispatch(enemyHit());
}

/**
 * Handles the firing of a phaser charge.
 * @param {number} tick. Current tick
 */
function handlePhaser(tick: number): void {
    const { enemyLevelState, playerState, gameState, keyboardState } = appState();

    if (playerState.alive && // cant fire when dead
        keyboardState.phraser && // Fire phaser key was pressed.
        enemyLevelState.enemies.length > 0 && // The phaser cannot hit a random enemy if there are none.
        gameState.phasers > 0 && // You need phaser charged to firel
        enemyLevelState.phaserLocations.length === 0 && // You cannot fire a phaser while one is still on screen
        playerState.nozzleLocation) { // nozzle location can be undefined so we need a truthy check.

        const randomEnemy = getRandomArrayElement(enemyLevelState.enemies);
        const playerNozzleLocation = playerState.nozzleLocation;
        const randomEnemyCenter = randomEnemy.centerLocation;
        if (randomEnemyCenter !== undefined) {
            // Remove one phaser.
            dispatch(removePhaser());

            SoundPlayer.phaser();

            // Calculate the locations aka pixels where the phaser beam should appear.
            const phaserLocations = getPhaserLocations(playerNozzleLocation.left, playerNozzleLocation.top, randomEnemyCenter.left, randomEnemyCenter.top);

            // Dispatch to render the phaser
            dispatch(setPhaserLocations(phaserLocations));

            // Keep track how often the player used the phaser. This is registered in the GameState, not the EnemyLevelState
            // hence, it's a different dispatch.
            dispatch(phaserFired());

            // Pause the game for a very brief period. This is what the original game did
            // when you fired a phasor shot. This also makes it look 'good' because eveything will pause
            // for a brief time showing the phaser. When the game resumes, the phaser is gone.
            dispatch(setPause(true));

            // We need a timeout to resume the game here.
            window.setTimeout(() => {
                // Unpause the game to let rendering continue.
                dispatch(setPause(false));

                // Deal the with the enemy that got hit.
                handleEnemyHitByplayer(tick, randomEnemy);

                // Remove the phaser locations from the state so it is no longer rendered.
                dispatch(clearPhaserLocations());
            }, 100); // 100 ms speends like a right amount of time to pause
        }
    }
}