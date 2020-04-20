/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Location utilities
 * Responsibility:  Offer utility functions for GameLocations
 */

import GameLocation from "../Models/GameLocation";
import { getNextX, getNextY } from "./Geometry";
import speedProvider from "../Providers/SpeedProvider";

/**
 * Calculate distance in pixels.
 * @param {GameLocation} location1. Location 1
 * @param {GameLocation} location2. Location 2
 * @returns {number}. Distance in actual pixels.
 */
export function calculateDistance(location1: GameLocation, location2: GameLocation): number {

    const xd = location1.left - location2.left;
    const yd = location1.top - location2.top;

    return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
}

/**
 * Checks if a location falls within an area.
 * @param {GameLocation} location.
 * @param {number} top. Top of the area.
 * @param {number} bottom. Bottom of the area.
 * @param {number} left. Left of the area.
 * @param {number} right. Right of the area.
 */
export function fallsWithin(location: GameLocation, top: number, bottom: number, left: number, right: number): boolean {

    const yBounds = location.top > top && location.top < bottom;
    const xBounds = location.left > left && location.left < right;

    return xBounds && yBounds;
}

/**
 * Calculates a location.
 * @param {number} angle. The angle of the object.
 * @param {number} speed. The speed the of the object
 * @param {number} right. The right outer bounds where the object can travel
 * @param {number} left. The current left coordinate of the object.
 * @returns {Location}. The location of the object. If angle is undefined the original location is returns as a new object.
 */
export function getLocation(location: GameLocation, angle: number | undefined, speed: number): GameLocation {

    if (angle === undefined) {
        return { ...location };
    }

    const relativeSpeed = speedProvider(speed);

    const nextLeft = getNextX(angle, relativeSpeed, location.left);
    const nextTop = getNextY(angle, relativeSpeed, location.top);

    return {
        left: nextLeft,
        top: nextTop,
    };
}

/**
 * Offsets a location using the given offsers and return a new GameLocation object.
 * @param {GameLocation} location. Original location.
 * @param {GameLocation} offset. Location usable for rendering.
 * @param {number} pixelSize. Pixel size used to calculate the actual location.
 * @returns {GameLocation}. A new game location offset to animation overlap.
 */
export function getOffsetLocation(location: GameLocation, leftOffset: number, topOffset: number): GameLocation {
    return {
        left: location.left + leftOffset,
        top: location.top + topOffset,
    };
}