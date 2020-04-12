/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import KeyboardState from "../Handlers/KeyboardStateHandler/KeyboardState";
import { GameRectangle } from "../Models/GameRectangle";

/**
 * Module:          Geometry
 * Responsibility:  Contains geometry functions.
 */

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

/**
 * returns the reverse angle
 * @param {number} angle. An angle in degrees
 */
export function reverseDegreeAngle(angle: number): number {
    let newAngle = angle += 180;

    if (newAngle > 360) {
        newAngle -= 360;
    }

    return newAngle;
}