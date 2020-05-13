/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import speedProvider from "../Providers/SpeedProvider";
import { getLeftOrRightFromAngle, getNextX, getNextY } from "./Geometry";
import { Angle } from "../Types";

/**
 * Module:          Location utilities
 * Responsibility:  Offer utility functions for stuff that needs to know where it is.
 */

const {
    gameField,
    pixelSize
} = dimensionProvider();

/**
 * Calculate distance in pixels.
 * @param {number} left1. 1st left coordinate.
 * @param {number} top1. 1st top coordinate.
 * @param {number} left2. 2nd left coordinate.
 * @param {number} top2. 2nd right coordinate.
 * @returns {number}. Distance in actual pixels.
 */
export function calculateDistance(left1: number, top1: number, left2: number, top2: number): number {

    const xd = left1 - left2;
    const yd = top1 - top2;

    return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
}

/**
 * Checks if a location falls within an area.
 * @param {number} left. Left coordinate
 * @param {number} top. Top coordinate.
 * @param {number} outerTop. Top of the area.
 * @param {number} outerBottom. Bottom of the area.
 * @param {number} outerLeft. Left of the area.
 * @param {number} outerRight. Right of the area.
 * @returns {boolean}. Returns true if the given coordinates fall within the given limits.
 */
export function fallsWithin(left: number, right: number, top: number, bottom: number, outerLeft: number, outerRight: number, outerTop: number, outerBottom: number): boolean {

    const yBounds = bottom >= outerTop && top <= outerBottom;
    const xBounds = right >= outerLeft && left <= outerRight;

    const res = xBounds && yBounds;

    return res;
}

/**
 * fallsWithinGameField. Returns true if the location falls within the game field
 * @param {number} left. Left coordinate.
 * @param {number} right. Right coordinate.
 * @param {number} top. Top coordinate.
 * @param {number} bottom. Bottom coordinate.
 * @returns {boolean}. True if the given coordinates fall within the game field
 */
export function fallsWithinGameField(left: number, right: number, top: number, bottom: number): boolean {
    const res = fallsWithin(left, right, top, bottom, gameField.left, gameField.right, gameField.top, gameField.bottom - pixelSize);

    return res;
}

/**
 * Calculates a location.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {Angle} angle. The angle of the object.
 * @param {number} speed. The speed the of the object
 * @returns {GameLocation}. The location of the object. If angle is undefined the original location is returns as a new object.
 */
export function getLocation(left: number, top: number, angle: Angle, speed: number): GameLocation {

    if (angle === undefined) {
        return {
            left,
            top,
        };
    }

    const relativeSpeed = speedProvider(speed);

    const nextLeft = getNextX(angle, relativeSpeed, left);
    const nextTop = getNextY(angle, relativeSpeed, top);

    return {
        left: nextLeft,
        top: nextTop,
    };
}

/**
 * Offsets a location using the given offsers and return a new location.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {number} leftOffset. Left offset in real pixels.
 * @param {number} topOffset. Top offset in real pixels.
 * @returns {location}. A new location offset to animation overlap.
 */
export function getOffsetLocation(left: number, top: number, leftOffset: number, topOffset: number): GameLocation {
    return {
        left: left + leftOffset,
        top: top + topOffset,
    };
}

/**
 * getNextLocationWithinBoundaries. Returns the next location that falls within the given boundaries.
 * This function will reset the left and right positions.
 * @param {number} currentLeft. Current left position of the object.
 * @param {number} currentTop. Current top position of the object
 * @param {number} width. Width of the object.
 * @param {number} angle. Travel angle.
 * @param {number} speed. Speed of travel.
 * @param {number} maxTop. Maximum top position before the object must go down.
 * @param {number} maxBottom. Maximum bottom position before the object must go up.
 */
export function getNextLocationWithinBoundaries(
    currentLeft: number,
    currentTop: number,
    width: number,
    angle: number,
    speed: number,
    maxTop: number,
    maxBottom: number): GameLocation {

    // Get the next location, this location might fall outside the boundaries.
    let { left, top } = getLocation(currentLeft, currentTop, angle, speed);

    // Determine which way the enemy is rought moving, left or right. This
    // determine is we use the left or rigth side of the gamfield to
    // determine if the enemy is moving off screen.

    const direction = getLeftOrRightFromAngle(angle);
    if (direction === "right") {
        if (left - width > gameField.right) {
            left = gameField.left - width;
        }
    } else if (direction === "left") {
        if (left + width < gameField.left) {
            left = gameField.right + width;
        }
    }

    if (top > maxBottom) {
        top = maxTop;
    }

    return { left, top };
}

/**
 * getNextLocationAndAngle. Returns a new location and angle (if required). This function will also flip angles to ensure
 * an object bounces off the outer limits. The left and right limit are the gameField.left and right coordinate
 * Top and bottom are passed as a parameter.
 * @param {number} currentLeft. Current left position of the object.
 * @param {number} currentTop. Current top position of the object.
 * @param {number} angle. Current angle of the object.
 * @param {number} speed. Speed of the object.
 * @param {number} width. Width o the object.
 * @param {number} height. Height of the object.
 * @param {number} topLimit. top limit. This is as high as the top coordiante can go.
 * @param {number} bottomLimit. bottom limit. This is as high as the bottom limit can go.
 */
export function getNextLocationAndAngle(currentLeft: number, currentTop: number, angle: number, speed: number, width: number, height: number, topLimit: number, bottomLimit: number): { location: GameLocation, angle: number } {
    const nextLocation = getLocation(currentLeft, currentTop, angle, speed);

    if (nextLocation.left <= gameField.left || nextLocation.left + width >= gameField.right) {
        angle = 180 - angle;
    }

    if (nextLocation.top <= topLimit || nextLocation.top >= bottomLimit - height) {
        angle *= -1;
    }

    // Grab in a fresh location in case the angle was changed.
    const location = getLocation(nextLocation.left, nextLocation.top, angle, speed);

    return {
        location,
        angle
    };
}
