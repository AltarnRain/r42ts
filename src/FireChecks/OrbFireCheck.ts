/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import EnemyLevelRunner from "../Runners/EnemyLevelRunner";
import { appState } from "../State/Store";

/**
 * Module:          OrbFireCheck
 * Responsibility:  Fire check function for the Orb enemy
 */

/**
 * Defines the orb fire behaviour.
 * Orbs fire a salvo of 5 bullets, aimed at the player. They never fire until all their
 * bullets are offscreen.
 * @param {BaseEnemy} enemy.
 */
export default function orbFireCheck(enemy: BaseEnemy): boolean {
    const {
        enemyLevelState
    } = appState();

    let canFire = false;

    const enemyBullets = enemyLevelState.bullets;

    if (enemyBullets.length === 0) {
        // No bullets, can always fire.
        return true;
    } else if (enemyBullets.length < 5) {
        if (enemyLevelState.remainingEnemies >= 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = enemyBullets.filter((p) => p.owner === enemy.getId()).length === 0;
        } else if (enemyLevelState.remainingEnemies < 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = enemyBullets.filter((p) => p.owner === enemy.getId()).length < Math.ceil(5 / enemyLevelState.remainingEnemies);
        } else {
            canFire = false;
        }
    } else {
        // Enemy shouldn't fire, so, we can return it.
        return false;
    }

    return canFire;
}
