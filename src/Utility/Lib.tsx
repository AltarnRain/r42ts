/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Lib
 * Responsibility:  A library containing various helper functions
 */

/**
 * Creates a clone for the provides Frames.
 * @param {Frames} frames. Frames to clone.
 * @returns {Frames}. A clone of the provided frames.
 */
export function cloneObject<T>(obj: T): T {
    // Create a clone using JSON.
    return JSON.parse(JSON.stringify(obj)) as T;
}

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
    return time *  1 / factor;
}