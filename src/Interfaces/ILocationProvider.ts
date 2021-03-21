/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";

/**
 * Module:          ILocationProvider
 * Responsibility:  Constants for all location providers. This means a location provider can be defined using the base class
 *                  or written from scratch.
 */

export default interface ILocationProvider {
    /**
     * Returns the current location
     */
    getCurrentLocation(): GameLocation;

    /**
     * Update the state so the current location changes.
     * @param {number} tick. Current tick.
     */
    updateState(tick?: number): void;

    /**
     * Increases the speed of the object with a factor.
     * @param {number} factor. A factor.
     */
    increaseSpeed(factor: number): void;
}
