/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import { appState } from "../State/Store";
import { EnemyState } from "../State/EnemyLevel/EnemyState";

/**
 * Module:          RobotFireCheck
 * Responsibility:  Fire check funciton used by robots in level 02.
 */

/**
 * Level 02 robot canFire. Only the right most robot fires bullets.
 * @param {BaseEnemy} self. Reference to a robot object. Called from within the RobotEnemy to determine
 * if the robot can fire bullets or not.
 */
export default function robotLevel02FireCheck(enemy: EnemyState): boolean {

    const {
        enemyState,
    } = appState().enemyLevelState;

    const lastEnemy = enemyState[enemyState.length -1];

    if (lastEnemy !== undefined) {
        if (lastEnemy.enemyId === enemy.enemyId) {
            const rnd = Math.ceil(Math.random() * 20);
            return rnd === 1;
        }
    }

    return false;
}
