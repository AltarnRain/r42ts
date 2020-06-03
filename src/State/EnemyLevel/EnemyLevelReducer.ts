/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          EnemyLevelReducuer
 * Responsibility:  Jandle state updates to the EnemyLevelState.
 */

import produce from "immer";
import EnemyLevelEnum from "./EnemyLevelEnum";
import EnemyLevelState from "./EnemyLevelState";
import { EnemyLevelTypes } from "./EnemyLevelTypes";

/**
 * enemyLevelReducer
 * @param {EnemyLevelState} state. The current state.
 * @param {EnemyLevelTypes} action. The desired action with optional paylood.
 * @returns {EnemyLevelState}. New state.
 */
export default function enemyLevelReducer(state: EnemyLevelState = initState(), action: EnemyLevelTypes): EnemyLevelState {

    const newState = produce(state, (draft) => {
        switch (action.type) {
            case EnemyLevelEnum.addExplosionCenter:
                draft.explosionCenters.push(action.explosionCenter);
                draft.shrapnells.push(...action.shrapnell);
                break;
            case EnemyLevelEnum.setShrapnellState:
                draft.shrapnells = action.shrapnell;
                break;
            case EnemyLevelEnum.setPhaserLocations:
                draft.phaserLocations = action.payload;
                break;
            case EnemyLevelEnum.clearPhaserLocations:
                draft.phaserLocations = [];
                break;
            case EnemyLevelEnum.setExplosionCenters:
                draft.explosionCenters = action.explosionCenters;
                break;
            case EnemyLevelEnum.addBullet:
                draft.bullets.push(action.bullet);
                break;
            case EnemyLevelEnum.setBulletState:
                draft.bullets = action.bullets;
                break;
            case EnemyLevelEnum.setTotalEnemies:
                draft.totalNumberOfEnemies = action.totalEnemies;
                break;
            case EnemyLevelEnum.removeEnemy:
                draft.enemies = draft.enemies.filter((es) => es.enemyId !== action.enemyId);
                break;
            case EnemyLevelEnum.setEnemyLastFireTick: {
                const index = state.enemies.findIndex((es) => es.enemyId === action.payload.enemyId);
                if (index > -1) {
                    draft.enemies[index].lastFiretick = action.payload.tick;
                }

                break;
            }

            case EnemyLevelEnum.setEnemies: {
                draft.enemies = action.enemies;
                break;
            }
        }
    });

    if (action.type === EnemyLevelEnum.resetLevelState) {
        return initState();
    }

    return newState;
}

function initState(): EnemyLevelState {
    return {
        shrapnells: [],
        phaserLocations: [],
        explosionCenters: [],
        bullets: [],
        totalNumberOfEnemies: 0,
        enemies: [],
    };
}