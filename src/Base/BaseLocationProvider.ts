/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../Interfaces/ILocationProvider";
import GameLocation from "../Models/GameLocation";

/**
 * Module:          BaseLocationProvider
 * Responsibility:  BaseClass for most location providers.
 */

export default abstract class BaseLocationProvider implements ILocationProvider {
    /**
     * Base speed. Used to calculate speed increaes.
     */
    private baseSpeed: number;
    constructor(
        protected left: number,
        protected top: number,
        protected speed: number,
        protected angle: number,
        protected width: number,
        protected height: number) {

        this.baseSpeed = speed;
    }

    /**
     * Returns a location. Implement specific movement behaviours in a diriving class.
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate.
     * @param {number} width. Width of the object.
     * @param {number} height. Height of the object.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top
        };
    }

    /**
     * Updates the state of the location provider.
     * @param {number} tick. Current tick
     */
    public abstract updateState(tick: number): void;

    /**
     * increases the speed by the provided factor.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed * factor;
    }
}
