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

/**
 * Splits a URI that uses ? to pass stuff into key value pairs. Only used in playground to debug.
 * @param {string} query.
 * @returns {KeyValuePair}. An array of keys and valyes.
 */
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

/**
 * 50/50 change to return true of false
 * @returns {boolean}. True or false.
 */
export function coinFlip(): boolean {
    return Math.floor(Math.random() * 2) === 1;
}

/**
 * Get the key value from an object.
 * @param {string} key Object's key.
 * @param {string} obj The object.
 */
export function getKeyValue<T extends object, U extends keyof T>(key: U, obj: T) {
    return obj[key];
}
