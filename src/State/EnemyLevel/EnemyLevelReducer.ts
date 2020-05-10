/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          LevelReducuer
 * Responsibility:  LevelReducer.
 */

import produce from "immer";
import Constants from "./EnemyLevelConstants";
import EnemyLevelState from "./EnemyLevelState";
import { EnemyLevelTypes } from "./EnemyLevelTypes";

/**
 * enemyLevelReducer
 * @param {EnemyLevelState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {EnemyLevelState}. New state.
 */
export default function enemyLevelReducer(state: EnemyLevelState = initState(), action: EnemyLevelTypes): EnemyLevelState {

    const newState = produce(state, (draft) => {
        switch (action.type) {
            case Constants.addExplosionCenter:
                draft.explosionCenters.push(action.explosionCenter);
                draft.shrapnells.push(...action.shrapnell);
                break;
            case Constants.setShrapnellState:
                draft.shrapnells = action.shrapnell;
                break;
            case Constants.addParticle:
                draft.shrapnells.push(action.particle);
                break;
            case Constants.addParticles:
                draft.shrapnells.push(...action.particles);
                break;
            case Constants.resetLevelState:
                draft = initState();
                break;
            case Constants.setPhaserLocations:
                draft.phaserLocations = action.payload;
                break;
            case Constants.clearPhaserLocations:
                draft.phaserLocations = [];
                break;
            case Constants.setFireInterval:
                draft.fireInterval = action.payload;
                break;
            case Constants.setExplosionCenters:
                draft.explosionCenters = action.explosionCenters;
                break;
            case Constants.addBullet:
                draft.bullets.push(action.bullet);
                break;
            case Constants.setBulletState:
                draft.bullets = action.bullets;
                break;
            case Constants.setTotalEnemies:
                draft.totalNumberOfEnemies = action.totalEnemies;
                break;
            case Constants.addOrUpdateEnemy:
                const index = state.enemies.findIndex((es) => es.enemyId === action.enemyState.enemyId);
                if (index > -1) {
                    draft.enemies[index] = action.enemyState;
                } else {
                    draft.enemies.push(action.enemyState);
                }
                break;
            case Constants.removeEnemy:
                draft.enemies = draft.enemies.filter((es) => es.enemyId !== action.enemyId);
                break;
        }
    });

    return newState;
}

function initState(): EnemyLevelState {
    return {
        shrapnells: [],
        phaserLocations: [],
        fireInterval: 0,
        explosionCenters: [],
        bullets: [],
        totalNumberOfEnemies: 0,
        enemies: [],
        bulletData: undefined,
    };
}