/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../../Constants/Angles";
import ShipToFire from "../../ShipsToFire";
import { appState } from "../../State/Store";

/**
 * Module:          firstEnemyOccasionalDown
 * Responsibility:  First enemy shoots a bullet downs on occasion.
 */

export default function firstEnemyOccasionalDown(): ShipToFire[] {
    const {
        enemies: enemyState,
    } = appState().enemyLevelState;

    const returnValue: ShipToFire[] = [];

    const lastEnemy = enemyState[enemyState.length - 1];

    if (lastEnemy !== undefined) {
        const rnd = Math.ceil(Math.random() * 20);
        if (rnd === 1) {
            returnValue.push({ enemy: lastEnemy, angle: angles.down });
        }
    }

    return returnValue;
}