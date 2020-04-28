/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Enemy
 * Responsibility:  Type definition for the enemies in the EnemyLevel state.
 */

import { BaseEnemy } from "../../Base/BaseEnemy";

export interface Enemy {
    /**
     * The ship of the enemy.
     */
    ship: BaseEnemy;

    /**
     * Last tick when the enemy fired a bullet.
     */
    lastFireTick: number;
}
