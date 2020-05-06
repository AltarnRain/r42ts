/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import speedProvider from "../Providers/SpeedProvider";
import { getNextX, getNextY } from "./Geometry";

/**
 * Module:          Location utilities
 * Responsibility:  Offer utility functions for stuff that needs to know where it is.
 */

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
 */
export function fallsWithin(left: number, top: number, outerTop: number, outerBottom: number, outerLeft: number, outerRight: number): boolean {

    const yBounds = top > outerTop && top < outerBottom;
    const xBounds = left > outerLeft && left < outerRight;

    const res = xBounds && yBounds;

    return res;
}

export function fallsWithinGameField(left: number, top: number): boolean {
    const {
        gameField,
        pixelSize
    } = dimensionProvider();

    const res = fallsWithin(left, top, gameField.top, gameField.bottom - pixelSize, gameField.left, gameField.right);

    return res;
}

/**
 * Calculates a location.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {number | undefined} angle. The angle of the object.
 * @param {number} speed. The speed the of the object
 * @returns {{left: number, top: number}}. The location of the object. If angle is undefined the original location is returns as a new object.
 */
export function getLocation(left: number, top: number, angle: number | undefined, speed: number): GameLocation {

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
 * @param {number} pixelSize. Pixel size used to calculate the actual location.
 * @returns {location}. A new location offset to animation overlap.
 */
export function getOffsetLocation(left: number, top: number, leftOffset: number, topOffset: number): GameLocation {
    return {
        left: left + leftOffset,
        top: top + topOffset,
    };
}