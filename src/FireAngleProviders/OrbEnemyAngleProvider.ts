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
import { appState } from "../State/Store";

/**
 * Returns an angle of down/left or down/right but only if the passed enemy has a 'change' of hitting the
 * player. If it can't hit the player the angle will be undefined.
 * @param {BaseEnemy} self. An enemy.
 */
export default function orbEnemyAngleProvider(left: number, top: number): number | undefined {

    const {
        playerState,
        enemyLevelState,
    } = appState();

    const playerShip = playerState.ship;

    if (playerShip === undefined) {
        return undefined;
    }

    const playerHitbox = playerShip.getHitbox();

    // If the number of enemies is less than 5 there's a 1 in 5 change the enemy will fire down.
    if (enemyLevelState.enemies.length < 5) {
        const rnd = Math.ceil(Math.random() * 5) === 1;
        if (rnd) {
            return angles.down;
        }
    }

    if (left < playerHitbox.left) {
        return angles.rightdown;
    } else {
        return angles.leftdown;
    }
}
