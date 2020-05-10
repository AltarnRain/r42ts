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
import EnemyLevelRunner from "../Runners/EnemyLevelRunner";
import { setWarpGamteComplexity } from "../State/Game/GameActions";
import { appState, dispatch } from "../State/Store";
import Level01 from "./Level01";
import Level02 from "./Level02";
import { Level03 } from "./Level03";
import { Level05 } from "./Level05";
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
            return new Level01(EnemyLevelRunner.run, clearedEnemies);
        case 2:
            return new Level02(EnemyLevelRunner.run, clearedEnemies);
        case 3:
            return new Level03(EnemyLevelRunner.run, clearedEnemies);
        case 4:
            dispatch(setWarpGamteComplexity(0));
            return new WarpLevel();
        case 5:
            return new Level05(EnemyLevelRunner.run, clearedEnemies);
            break;
        default:
            return new Level01(EnemyLevelRunner.run, never);
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

/**
 * Used for debugging in level 00.
 * @returns {boolean}. Always false.
 */
function never(): boolean {
    return false;
}