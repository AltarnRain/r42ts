/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          LevelFactory
 * Responsibility:  Provide Level objects
 */

import BaseLevel from "../Base/BaseLevel";
import enemeyLevelRunner from "../Main/EnemeyLevelRunner";
import { appState } from "../State/Store";
import Level00 from "./Level00";
import Level01 from "./Level01";
import Level02 from "./Level02";

/**
 * LevelFactory. Provides level objects
 * @param {number} level. The desired level.
 * @returns {BaseLevel}. A level.
 */
export function levelFactory(level: number): BaseLevel {
    switch (level) {
        case 0:
            // Test level
            return new Level00(enemeyLevelRunner, never);
        case 1:
            return new Level01(enemeyLevelRunner, clearedEnemies);
        case 2:
            return new Level02(enemeyLevelRunner, clearedEnemies);
        default:
            return new Level00(enemeyLevelRunner, never);
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