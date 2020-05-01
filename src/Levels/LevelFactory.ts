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
import enemyLevelRunner from "../Runners/EnemyLevelRunner";
import { appState } from "../State/Store";
import Level01 from "./Level01";
import Level02 from "./Level02";
import { Level03 } from "./Level03";
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
            // return new Level00(enemyLevelRunner, never);
        case 1:
            return new Level01(enemyLevelRunner, clearedEnemies);
        case 2:
            return new Level02(enemyLevelRunner, clearedEnemies);
        case 3:
            return new Level03(enemyLevelRunner, clearedEnemies);
        case 4:
            return new WarpLevel();
        default:
            return new Level01(enemyLevelRunner, never);
    }
}

/**
 * clearedEnemies.
 * @returns {boolean}. Returns true if all enemies (and particles) have been removed from the ApplicationState.
 */
function clearedEnemies(): boolean {
    const { enemyLevelState: levelState } = appState();
    if (levelState.enemies.length === 0 && levelState.particles.length === 0) {
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