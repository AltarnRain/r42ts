/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Level
 * Responsibility:  Define a game level
 */

import EnemyType from "./EnemyType";
export default interface Level {
    /**
     * Enemy type
     */
    enemy: EnemyType;

    /**
     * Number of enemies
     */
    numberOfEnemies: number;
}
