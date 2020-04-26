/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DownAngleProvider
 * Responsibility:  Always returns 'down' as the angle
 */

import { angles } from "../Constants/Angles";

/**
 * Returns down.
 * @param {BaseEnemy} enemy. Any enemy.
 */
export default function DownFireAngleProvider(top: number, left: number): number {
    return angles.down;
}
