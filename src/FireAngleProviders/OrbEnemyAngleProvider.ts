/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DiagonalAtPlayerAngleProvider
 * Responsibility:  Returns down/left or down/right aimed at the player
 */

import { angles } from "../Constants/Angles";
import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { appState } from "../State/Store";

/**
 * Returns an angle of down/left or down/right but only if the passed enemy has a 'change' of hitting the
 * player. If it can't hit the player the angle will be undefined.
 * @param {BaseEnemy} self. An enemy.
 */
export default function orbEnemyAngleProvider(enemy: EnemyState, left: number, top: number): number | undefined {

    const {
        playerState,
        enemyLevelState
    } = appState();

    if (!playerState.playerAlive) {
        return undefined;
    }

    const playerHitbox = playerState.playerHitbox;

    if (playerHitbox === undefined) {
        return undefined;
    }

    // Increase the change the orb enemy will fire down as its numbers are reduced.
    const rnd = Math.ceil(Math.random() * enemyLevelState.remainingEnemies / 1.5);
    const canFireDown = rnd === 1;

    if (canFireDown) {
        const {
            centerLocation,
        } = enemy;

        if (centerLocation !== undefined) {
            // Check if it makes sense for the orb to fire down. If not, it'll pick one of its diagonal angles.
            if (centerLocation.left >= playerHitbox.left && centerLocation.left <= playerHitbox.right) {
                return angles.down;
            }
        }
    }

    if (left < playerHitbox.left) {
        return angles.rightdown;
    } else {
        return angles.leftdown;
    }
}
