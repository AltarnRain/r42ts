/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Array
 * Responsibility:  Array utilities
 */

/**
 * Returns a random element from an array
 * @param {T[]} arr. An array of type T.
 * @returns {T}. Value found in a random position.
 */
export function getRandomArrayElement<T>(arr: T[]): T {
    if (arr.length === 1) {
        return arr[0];
    } else {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}