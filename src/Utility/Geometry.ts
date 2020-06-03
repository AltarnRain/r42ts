/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import GameRectangle from "../Models/GameRectangle";
import KeyboardState from "../State/Keyboard/KeyboardState";
import Angle from "../Types/Angle";

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
export function getNextX(angle: number, speed: number, currentX: number): number {
    return Math.cos(angle * Math.PI / 180) * speed + currentX;
}

/**
 * Gets the next Y coordinate based on the angle, speed and the current Y coordinate.
 * @param {number} angle. The angle.
 * @param {number} speed. The speed.
 * @param {number} current. The current X coordinate.
 * @returns {number}. The next Y coordinate.
 */
export function getNextY(angle: number, speed: number, currentY: number): number {
    return Math.sin(angle * (Math.PI / 180)) * speed + currentY;
}

/**
 * getAngle.
 * @param {KeyboardState} state. Current keyboard dstate
 * @returns {number}. The angle. -1 indicates no movement.
 */
export function getAngle(state: KeyboardState): number {
    let angle = -1;
    if (state.up && state.left) {
        angle = angles.leftup;
    } else if (state.up && state.right) {
        angle = angles.rightup;
    } else if (state.down && state.left) {
        angle = angles.leftdown;
    } else if (state.down && state.right) {
        angle = angles.rightdown;
    } else if (state.left) {
        angle = angles.left;
    } else if (state.right) {
        angle = angles.right;
    } else if (state.up) {
        angle = angles.up;
    } else if (state.down) {
        angle = angles.down;
    }

    return angle;
}

/**
 * Returns true if two hitboxes overlap.
 * @param {GameRectangle | undefined} hitbox1.
 * @param {GameRectangle | undefined} hitbox2.
 * @returns {boolean}. True if overlap. If either hibox is undefined, returns false.
 */
export function overlaps(hitbox1: GameRectangle | undefined, hitbox2: GameRectangle | undefined): boolean {

    if (hitbox1 === undefined || hitbox2 === undefined) {
        return false;
    }

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
 * @param {number} startLeft. Left begin point.
 * @param {number} startTop. Top begin point.
 * @param {number} endLeft. Left end point.
 * @param {number} endTop. Top end pint.
 * @returns {number | undefined}. The angle to towards the target in degrees.
 */
export function calculateAngle(startLeft: number, startTop: number, endLeft: number, endTop: number): number | undefined {
    const dx = endLeft - startLeft;
    const dy = endTop - startTop;

    // Singularity.
    if (dx === 0 && dy === 0) {
        return undefined;
    }

    return Math.atan2(dy, dx) * 180 / Math.PI;
}

/**
 * Calculates the difference between two angles.
 * @param {number} angle1. Angle 1 in degrees.
 * @param {number} angle2. Angle 2 in degrees.
 * @returns {number}. The difference, in degrees, between the angles
 * Source: https://stackoverflow.com/questions/1878907/the-smallest-difference-between-2-angles
 */
export function calculateAngleDifference(angle1: number, angle2: number): number {
    const absoluteAngleDifference = Math.abs(angle1 - angle2);
    const angleDifference = (absoluteAngleDifference + 180) % 360 - 180;
    return Math.abs(angleDifference);
}

/**
 * Checks the angle if it is headed to the left or right.
 * Returns undefined if the angle is up or down.
 * @param {number} angle. an angle.
 * @returns {"left" | "right" | "undefined"}. Returns undefined if there is no left or right direction.
 */
export function getLeftOrRightFromAngle(angle: Angle): "left" | "right" | undefined {
    if (angle === undefined) {
        return undefined;
    }

    if (angle > 270 && angle <= 360 || angle >= 0 && angle < 90) {
        return "right";
    } else if (angle > 90 && angle < 270) {
        return "left";
    }
}

/**
 * Checks if the angle is headed u or down.
 * @param {Angle} angle. The angle
 * @returns {"up" | "down" | undefined}. Returns undefined if the angle is not going up or down.
 */
export function getUpOrDownFromAngle(angle: Angle): "up" | "down" | undefined {
    if (angle === undefined) {
        return undefined;
    }

    if (angle === 0 || angle === 360 || angle === 180) {
        return undefined;
    } else if (angle > 180 && angle < 360) {
        return "up";
    } else if (angle > 0 && angle < 180) {
        return "down";
    }
}