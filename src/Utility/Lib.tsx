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
 * Gets the next X coordinats based on the angle, speed and the current X coordinate.
 * @param {number} angle. The angle.
 * @param {number} speed. The speed.
 * @param {number} current. The current X coordinate.
 * @returns {number}. The next X coordinate.
 */
export function getNextX(angle: number, speed: number, current: number): number {
    return Math.cos(angle * Math.PI / 180) * speed + current;
}

/**
 * Gets the next Y coordinate based on the angle, speed and the current Y coordinate.
 * @param {number} angle. The angle.
 * @param {number} speed. The speed.
 * @param {number} current. The current X coordinate.
 * @returns {number}. The next Y coordinate.
 */
export function getNextY(angle: number, speed: number, current: number): number {
    return Math.sin(angle * (Math.PI / 180)) * speed + current;
}

/**
 * getAngle.
 * @param {KeyboardState} state. Current keyboard dstate
 * @returns {number}. The angle. -1 indicated the ship is not moving.
 */
export function getAngle(state: KeyboardState): number {
    let angle = -1;
    if (state.up && state.left) {
        angle = 225;
    } else if (state.up && state.right) {
        angle = 315;
    } else if (state.down && state.left) {
        angle = 135;
    } else if (state.down && state.right) {
        angle = 45;
    } else if (state.left) {
        angle = 180;
    } else if (state.right) {
        angle = 0;
    } else if (state.up) {
        angle = 270;
    } else if (state.down) {
        angle = 90;
    }

    return angle;
}

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

/**
 * Returns true if two hitboxes overlap.
 * @param {GameRectangle} hitbox1.
 * @param {GameRectangle} hitbox2.
 */
export function overlaps(hitbox1: GameRectangle, hitbox2: GameRectangle): boolean {

    if (hitbox1.right < hitbox2.left || hitbox1.left > hitbox2.right) {
        return false;
    }

    if (hitbox1.bottom < hitbox2.top || hitbox1.top > hitbox2.bottom) {
        return false;
    }

    return true;
}