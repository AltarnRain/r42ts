/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import { appState } from "../State/Store";
import { getEnemies } from "../Runners/EnemyLevelRunner";

/**
 * Module:          RobotFireCheck
 * Responsibility:  Fire check funciton used by robots in level 02.
 */

/**
 * Level 02 robot canFire. Only the right most robot fires bullets.
 * @param {BaseEnemy} self. Reference to a robot object. Called from within the RobotEnemy to determine
 * if the robot can fire bullets or not.
 */
export default function robotLevel02FireCheck(enemy: BaseEnemy): boolean {
    const enemies = getEnemies();
    const lastEnemy = enemies[enemies.length - 1];

    if (lastEnemy !== undefined) {
        if (lastEnemy.ship === enemy) {
            const rnd = Math.ceil(Math.random() * 20);
            return rnd === 1;
        }
    }

    return false;
}
