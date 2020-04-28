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
            case Constants.removeEnemy:
                draft.enemies = draft.enemies.filter((e) => e.ship !== action.payload);
                break;
            case Constants.addExplosionCenter:
                draft.explosionCenters.push(action.payload);
                break;
            case Constants.removeExplosionCenter:
                draft.explosionCenters = draft.explosionCenters.filter((e) => e !== action.payload);
                break;
            case Constants.addParticle:
                draft.particles.push(action.payload);
                break;
            case Constants.addParticles:
                draft.particles.push(...action.payload);
                break;
            case Constants.removeParticle:
                draft.particles = draft.particles.filter((p) => p !== action.payload);
                break;
            case Constants.resetLevelState:
                draft = initState();
                break;
            case Constants.setEnemies:
                draft.enemies = action.payload.map((e: BaseEnemy) => {
                    return {
                        ship: e,
                        lastFireTick: 0,
                    };
                });
                draft.totalNumberOfEnemies = action.payload.length;
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
            case Constants.setEnemyFireTick:
                const enemy = draft.enemies.find((e) => e.ship === action.payload.ship);
                if (enemy !== undefined) {
                    const enemyIndex = draft.enemies.indexOf(enemy);
                    draft.enemies[enemyIndex].lastFireTick = action.payload.tick;
                }
        }
    });

    return newState;
}

export function initState(): EnemyLevelState {
    return {
        enemies: [],
        pause: false,
        explosionCenters: [],
        particles: [],
        totalNumberOfEnemies: 0,
        phaserLocations: [],
        fireInterval: 0,
    };
}
