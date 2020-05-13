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
import { AsteroidLevel } from "./AsteroidLevel";
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
            return new EnemyLevel("bird");
        case 2:
            return new EnemyLevel("robot");
        case 3:
            return new EnemyLevel("orb");
        case 4:
            dispatch(setWarpGamteComplexity(0));
            return new WarpLevel();
        case 5:
            return new EnemyLevel("spinner");
        case 6:
            return new EnemyLevel("balloon");
        case 7:
            return new AsteroidLevel("asteroid-down");
        case 8:
            dispatch(setWarpGamteComplexity(1));
            return new WarpLevel();
        case 9:
            return new EnemyLevel("piston");
        case 10:
            return new EnemyLevel("diabolo");
        case 11:
            return new EnemyLevel("spacemonster-down");
        case 12:
            dispatch(setWarpGamteComplexity(2));
            return new WarpLevel();
        case 13:
            return new EnemyLevel("devil");
        case 14:
            return new EnemyLevel("balloon");
        default:
            return new EnemyLevel("bird");
    }
}

/**
 * clearedEnemies.
 * @returns {boolean}. Returns true if all enemies (and particles) have been removed from the ApplicationState.
 */

function time(): boolean {
    return false;
}