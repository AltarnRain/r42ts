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
import { setWarpGamteComplexity as setWarpGameComplexity } from "../State/Game/GameActions";
import { appState, dispatch } from "../State/Store";
import EnemyLevel from "./EnemyLevel";
import { TimeLimitLevel } from "./TimeLimitLevel";
import WarpLevel from "./WarpLevel";

/**
 * LevelFactory. Provides level objects
 * @param {number} level. The desired level.
 * @returns {BaseEnemyLevel}. A level.
 */
export function levelFactory(level: number): ILevel {

    const {
        gameState: { hardMode }
    } = appState();

    switch (level) {
        case 0:
            // Test level
            return new WarpLevel();
        case 1:
            if (hardMode) {
                return new EnemyLevel("bird-fire");
            } else {
                return new EnemyLevel("bird");
            }
        case 2:
            if (hardMode) {
                return new EnemyLevel("robots-random");
            } else {
                return new EnemyLevel("robot");
            }
        case 3:
            if (hardMode) {
                return new EnemyLevel("orb-up-down");
            } else {
                return new EnemyLevel("orb");
            }
        case 4:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(0));
            }

            return new WarpLevel();
        case 5:
            return new EnemyLevel("spinner");
        case 6:
            return new EnemyLevel("balloon");
        case 7:
            if (hardMode) {
                return new TimeLimitLevel("asteroid-diagonal");
            } else {
                return new TimeLimitLevel("asteroid-down");
            }
        case 8:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(1));
            }

            return new WarpLevel();
        case 9:
            return new EnemyLevel("piston");
        case 10:
            if (hardMode) {
                return new EnemyLevel("diabolo-hard");
            } else {
                return new EnemyLevel("diabolo");
            }
        case 11:
            if (hardMode) {
                return new TimeLimitLevel("spacemonster-diagonal");
            } else {
                return new TimeLimitLevel("spacemonster-down");
            }
        case 12:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(2));
            }

            return new WarpLevel();
        case 13:
            return new EnemyLevel("devil");
        case 14:
            return new EnemyLevel("balloon");
        case 15:
            return new TimeLimitLevel("asteroid-diagonal");
        case 16:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(3));
            }

            return new WarpLevel();
        case 17:
            return new EnemyLevel("crab");
        case 18:
            return new EnemyLevel("bat");
        case 19:
            return new TimeLimitLevel("spacemonster-diagonal");
        case 20:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(4));
            }

            return new WarpLevel();
        case 21:
            return new EnemyLevel("piston");
        case 22:
            return new EnemyLevel("boat");
        case 23:
            return new EnemyLevel("cloaking-orb");
        case 24:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(5));
            }

            return new WarpLevel();
        case 25:
            return new EnemyLevel("orb-up-down");
        case 26:
            return new TimeLimitLevel("asteroid-diagonal");
        case 27:
            return new TimeLimitLevel("spacemonster-diagonal");
        case 28:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(6));
            }

            return new WarpLevel();
        case 29:
            return new EnemyLevel("robots-random");
        case 30:
            return new EnemyLevel("boat");
        case 31:
            return new EnemyLevel("orb-up-down");
        case 32:
            if (hardMode) {
                dispatch(setWarpGameComplexity(8));
            } else {
                dispatch(setWarpGameComplexity(7));
            }

            return new WarpLevel();
        case 33:
            return new EnemyLevel("piston");
        case 34:
            return new EnemyLevel("bird-fire");
        case 35:
            // Max complexity
            dispatch(setWarpGameComplexity(8));
            return new WarpLevel();
        case 36:
        case 37:
            dispatch(setWarpGameComplexity(8));
            return new WarpLevel();
        case 38:
            return new EnemyLevel("spinner");
        case 39:
        case 40:
        case 41:
            dispatch(setWarpGameComplexity(8));
            return new WarpLevel();
        case 42:
            return new EnemyLevel("fish");
        default:
            // Reset to first level.
            return new EnemyLevel("crab");
    }
}