/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DownAngleProvider
 * Responsibility:  Always returns 'down' as the angle
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import { angles } from "../Constants/Angles";

/**
 * Returns down.
 * @param {BaseEnemy} enemy. Any enemy.
 */
export function downAngleProvider(enemy: BaseEnemy): number {
    return angles.down;
}
