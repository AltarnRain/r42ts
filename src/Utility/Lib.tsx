/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import KeyValuePair from "../Models/KeyValuePair";

/**
 * Module:          Lib
 * Responsibility:  A library containing various helper functions
 */

/**
 * Picks a random number within a range.
 * @param {number} max. Maximum value.
 * @param {number} min. Minimum value.
 */
export function randomNumberInRange(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Calculates the new time to be used between ticks based on the passed factor.
 * @param {number} time. The time to use as a base.
 * @param {number} factor. A factor > 1 is an increase, < 1 a decrease.
 */
export function calculateTimeSpeedIncrease(time: number, factor: number): number {
    return time * 1 / factor;
}

export function getURLQueryKVPs(query: string): KeyValuePair[] {
    const kvps = query.split("?");
    return kvps.map((item) => {
        const kvp = item.split("=");
        return {
            key: kvp[0],
            value: kvp[1],
        };
    });
}