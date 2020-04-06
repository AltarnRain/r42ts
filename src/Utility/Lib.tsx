/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Lib
 * Responsibility:  A library containing various helper functions
 */

import KeyboardState from "../Handlers/KeyboardStateHandler/KeyboardState";
import { GameRectangle } from "../Models/GameRectangle";

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
 * pads a string on its left size until it is a given length
 * @param {string} value. Value to pad left.
 * @param {number} length. Length of the desired output.
 * @param {string} paddWidth. Character to pad width.
 */
export function padLeft(value: string, length: number, padWidth: string): string {

    if (value.length >= length) {
        return value;
    } else {

        const padLength = length - value.length;
        let padding = "";

        for (let i = 0; i < padLength; i++) {
            padding += padWidth;
        }

        return padding + value;
    }
}

/**
 * Picks a random number within a range.
 * @param {number} max. Maximum value.
 * @param {number} min. Minimum value.
 */
export function randomNumberInRange(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
