/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          LevelFactory
 * Responsibility:  Provide Level objects
 */

import ILevel from "../Interfaces/ILevel";
import { setWarpGamteComplexity } from "../State/Game/GameActions";
import { appState, dispatch } from "../State/Store";
import EnemyLevel from "./EnemyLevel";
import WarpLevel from "./WarpLevel";

/**
 * LevelFactory. Provides level objects
 * @param {number} level. The desired level.
 * @returns {BaseEnemyLevel}. A level.
 */
export function levelFactory(level: number): ILevel {
    switch (level) {
        case 0:
            // Test level
            return new WarpLevel();
        case 1:
            return new EnemyLevel("bird", clearedEnemies);
        case 2:
            return new EnemyLevel("robot", clearedEnemies);
        case 3:
            return new EnemyLevel("orb", clearedEnemies);
        case 4:
            dispatch(setWarpGamteComplexity(0));
            return new WarpLevel();
        case 5:
            return new EnemyLevel("spinner", clearedEnemies);
        case 6:
            return new EnemyLevel("balloon", clearedEnemies);
        case 7:
            return new EnemyLevel("asteroid-down", time);
        default:
            return new EnemyLevel("bird", clearedEnemies);
    }
}

/**
 * clearedEnemies.
 * @returns {boolean}. Returns true if all enemies (and particles) have been removed from the ApplicationState.
 */
function clearedEnemies(): boolean {
    const { enemyLevelState: { enemies, shrapnells } } = appState();
    if (enemies.length === 0 && shrapnells.length === 0) {
        return true;
    }

    return false;
}

function time(): boolean {
    return false;
}