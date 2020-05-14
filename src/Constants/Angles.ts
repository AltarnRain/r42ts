/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Angles
 * Responsibility:  Define the simple angles
 */

export const angles = {
    left: 180,
    right: 0,
    up: 270,
    down: 90,
    leftup: 235,
    rightup: 325,
    leftdown: 135,
    leftleftdown: 155,
    rightdown: 45,
    rightrightdown: 25
};

/**
 * Returns all angles as numbers.
 * @returns {number[]}.
 */
export function getAngles(): number[] {
    return Object.keys(angles).map((k) => (angles as any)[k] as number);
}