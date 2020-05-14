/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import ShipToFire from "../ShipsToFire";
import { appState } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { GetShipsReadyToFire } from "./GetShipsReadyToFire";

/**
 * Module:          MaxFiveDiagonal
 * Responsibility:  Provides 5 enemies to fire.
 */

const maxBullets = 3;

/**
 * A function that selects the orbs that should fire.
 * @param {number} tick. Current tick
 */
export default function maxThreeDown(tick: number): ShipToFire[] {

    const {
        enemyLevelState: { bullets }
    } = appState();
    const returnValue: ShipToFire[] = [];

    const remainingBullets = maxBullets - bullets.length;

    if (remainingBullets === 0) {
        return returnValue;
    }

    const enemies = GetShipsReadyToFire(tick);

    const enemyToFire = getRandomArrayElement(enemies);

    if (enemyToFire !== undefined) {
        const queuedTofire = returnValue.find((e) => e.enemy.enemyId === enemyToFire.enemyId) !== undefined;
        const mayFire = enemies.length < maxBullets || !bullets.some((bullet) => bullet.owner === enemyToFire.enemyId);
        if (!queuedTofire && mayFire) {
            returnValue.push({ enemy: enemyToFire, angle: angles.down });
        }
    }

    return returnValue;
}