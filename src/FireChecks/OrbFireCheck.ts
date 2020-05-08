/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { EnemyState } from "../State/EnemyLevel/EnemyState";
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
export default function orbFireCheck(enemy: EnemyState): boolean {
    const {
        enemyLevelState: { enemies, bullets}
    } = appState();

    let canFire = false;

    const remainingEnemies = enemies.length;

    if (bullets.length === 0) {
        // No bullets, can always fire.
        return true;
    } else if (bullets.length < 5) {
        if (remainingEnemies >= 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = bullets.filter((p) => p.owner === enemy.enemyId).length === 0;
        } else if (remainingEnemies < 5) {
            // if there's 5 enemies or more, an enemy is limited to a single bullet.
            canFire = bullets.filter((p) => p.owner === enemy.enemyId).length < Math.ceil(5 / remainingEnemies);
        } else {
            canFire = false;
        }
    } else {
        // Enemy shouldn't fire, so, we can return it.
        return false;
    }

    return canFire;
}
