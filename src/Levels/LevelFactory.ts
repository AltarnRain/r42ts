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
import { setLevel, setWarpGamteComplexity as setWarpGameComplexity } from "../State/Game/GameActions";
import { dispatch } from "../State/Store";
import EnemyLevel from "./EnemyLevel";
import { TimeLimitLevel } from "./TimeLimitLevel";
import WarpLevel from "./WarpLevel";

/**
 * LevelFactory. Provides level objects
 * @param {number} level. The desired level.
 * @returns {BaseEnemyLevel}. A level.
 */
export function levelFactory(level: number): ILevel | undefined {
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
            dispatch(setWarpGameComplexity(0));
            return new WarpLevel();
        case 5:
            return new EnemyLevel("spinner");
        case 6:
            return new EnemyLevel("balloon");
        case 7:
            return new TimeLimitLevel("asteroid-down");
        case 8:
            dispatch(setWarpGameComplexity(1));
            return new WarpLevel();
        case 9:
            return new EnemyLevel("piston");
        case 10:
            return new EnemyLevel("diabolo");
        case 11:
            return new TimeLimitLevel("spacemonster-down");
        case 12:
            dispatch(setWarpGameComplexity(2));
            return new WarpLevel();
        case 13:
            return new EnemyLevel("devil");
        case 14:
            return new EnemyLevel("balloon");
        case 15:
            return new EnemyLevel("asteroid-diagonal");
        case 16:
            dispatch(setWarpGameComplexity(2));
            return new WarpLevel();
        case 17:
            return new EnemyLevel("crab");
        case 18:
            return new EnemyLevel("bat");
        case 19:
            return new TimeLimitLevel("spacemonster-diagonal");
        case 20:
            dispatch(setWarpGameComplexity(2));
            return new WarpLevel();
        case 21:
            return new EnemyLevel("piston");
        case 22:
            return new EnemyLevel("boat");
        default:
            // Reset to first level.
            return new EnemyLevel("crab");
    }
}