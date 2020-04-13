/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import KeyboardState from "../Handlers/KeyboardStateHandler/KeyboardState";
import { GameRectangle } from "../Models/GameRectangle";
import GameLocation from "../Models/GameLocation";

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
 * @returns {number}. The angle in the opposite direction.
 */
export function reverseDegreeAngle(angle: number): number {
    let newAngle = angle += 180;

    if (newAngle > 360) {
        newAngle -= 360;
    }

    return newAngle;
}

/**
 * Calculates the angle from the source location to the target location.
 * @param {GameLocation} start. Begin point of the vector.
 * @param {GameLocation} end. End point of the factor.
 * @returns {number}. The angle to towards the target in degrees.
 */
export function calculateVector(start: GameLocation, end: GameLocation): number {
    const dx = Math.abs(start.left - end.left);
    const dy = Math.abs(start.top - end.top);

    // Get the angle in degrees.
    let angle = Math.atan2(dy, dx) * 180 / Math.PI * -1;
    // bottom left is handler right by default. No if needed.
    // source is to the bottom right of the object.
    if (start.left > end.left && start.top > end.top) {
        angle = 180 - angle;
    } else if (start.left < end.left && start.top < end.top) {
        // source is to the top left of the object.
        angle = angle * -1;
    } else if (start.left > end.left && start.top < end.top) {
        // source is to the top right of the object.
        angle = angle - 180 * -1;
    }
    return angle;
}