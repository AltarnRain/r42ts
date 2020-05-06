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
import { BaseEnemy } from "../../Base/BaseEnemy";
import Constants from "./Constants";
import EnemyLevelState from "./EnemyLevelState";
import { EnemyLevelTypes } from "./Types";

/**
 * enemyLevelReducer
 * @param {EnemyLevelState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {EnemyLevelState}. New state.
 */
export default function enemyLevelReducer(state: EnemyLevelState = initState(), action: EnemyLevelTypes): EnemyLevelState {

    const newState = produce(state, (draft) => {
        switch (action.type) {
            // case Constants.removeEnemy:
            //     draft.enemies = draft.enemies.filter((e) => e.ship !== action.payload);
            //     break;
            case Constants.addExplosionCenter:
                draft.explosionCenters.push(action.payload);
                break;
            case Constants.addParticle:
                draft.shrapnell.push(action.particle);
                break;
            case Constants.addParticles:
                draft.shrapnell.push(...action.particles);
                break;
            case Constants.setShrapnellState:
                draft.shrapnell = action.shrapnell;
                break;
            case Constants.resetLevelState:
                draft = initState();
                break;
            // case Constants.setEnemies:
            //     draft.enemies = action.payload.map((e: BaseEnemy) => {
            //         return {
            //             ship: e,
            //             lastFireTick: 0,
            //         };
            //     });
            //     draft.totalNumberOfEnemies = action.payload.length;
            //     break;
            case Constants.setPhaserLocations:
                draft.phaserLocations = action.payload;
                break;
            case Constants.clearPhaserLocations:
                draft.phaserLocations = [];
                break;
            case Constants.setFireInterval:
                draft.fireInterval = action.payload;
                break;
            // case Constants.setEnemyFireTick:
            //     const enemy = draft.enemies.find((e) => e.ship === action.payload.ship);
            //     if (enemy !== undefined) {
            //         const enemyIndex = draft.enemies.indexOf(enemy);
            //         draft.enemies[enemyIndex].lastFireTick = action.payload.tick;
            //     }
            //     break;
            case Constants.setExplosionData:
                draft.explosionData = action.explosionData;
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
            case Constants.setRemainingEnemies:
                draft.remainingEnemies = action.remainingEnemies;
                break;
        }
    });

    return newState;
}

function initState(): EnemyLevelState {
    return {
        shrapnell: [],
        // totalNumberOfEnemies: 0,
        phaserLocations: [],
        fireInterval: 0,
        explosionCenters: [],
        explosionData: undefined,
        bullets: [],
        totalNumberOfEnemies: 0,
        remainingEnemies: 0,
    };
}