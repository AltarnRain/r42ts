/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DiagonalAtPlayerAngleProvider
 * Responsibility:  Returns down/left or down/right aimed at the player
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import { angles } from "../Constants/Angles";
import { appState } from "../State/Store";

/**
 * Returns an angle of down/left or down/right but only if the passed enemy has a 'change' of hitting the
 * player. If it can't hit the player the angle will be undefined.
 * @param {BaseEnemy} self. An enemy.
 */
export function diagonalAtPlayerAngleProvider(enemy: BaseEnemy): number | undefined {

    const {
        playerState
    } = appState();

    const enemyCenter = enemy.getCenterLocation();
    const playerShip = playerState.ship;

    if (playerShip === undefined) {
        return undefined;
    }

    const playerHitbox = playerShip.getHitbox();

    if (enemyCenter.left < playerHitbox.left) {
        return angles.rightdown;
    } else {
        return angles.leftdown;
    }
}
