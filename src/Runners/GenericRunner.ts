/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GenericRunner
 * Responsibility:  Handles generic state updates that can occur in any level.
 */

import GameLoop from "../GameLoop";
import renderFrame from "../Render/RenderFrame";
import { setBulletState, setExplosionCenters, setShrapnellState } from "../State/EnemyLevel/EnemyLevelActions";
import { addLifeAndPhaser } from "../State/Game/GameActions";
import { StateProviders } from "../State/StateProviders";
import { appState, dispatch } from "../State/Store";

export default function genericRunner(tick: number): void {
    handleExplosionCenters(tick);
    handleBullets();
    handleShrapnell();
    handleScoreAward();
    GameLoop.registerDraw(draw);
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
 * Handle bullet movement.
 */
function handleBullets(): void {
    const bullets = appState().enemyLevelState.bullets;
    const newState = StateProviders.getUpdatedParticleState(bullets);

    dispatch(setBulletState(newState));
}

/**
 * Handles particles state updates.
 * @param {number} tick. Current tick.
 */
function handleShrapnell(): void {
    const newState = StateProviders.getUpdatedParticleState(appState().enemyLevelState.shrapnells);
    dispatch(setShrapnellState(newState));
}

/**
 * Awards a life and phaser each 7500 points
 */
function handleScoreAward(): void {
    const {
        gameState
    } = appState();
    if (gameState.score - gameState.lastAwardScore >= 7500) {
        dispatch(addLifeAndPhaser());
    }
}

function draw(): void {
    const { explosionCenters, shrapnells } = appState().enemyLevelState;
    for (const center of explosionCenters) {
        renderFrame(center.left, center.top, center.coloredFrame);
    }

    for (const shrapnell of shrapnells) {
        renderFrame(shrapnell.left, shrapnell.top, shrapnell.coloredFrame);
    }
}