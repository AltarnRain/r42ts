/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../Base/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import { getLocation } from "../Utility/Location";

/**
 * Module:          Accelerating
 * Responsibility:  A location provider for something that accelerates.
 */

export default class AcceleratingLocationProvider implements ILocationProvider {

    /**
     * Acceleration factor.
     */
    private acceleration: number;
    private left: number;
    private top: number;
    private speed: number;
    private angle: number;

    constructor(left: number, top: number, speed: number, angle: number, acceleration: number) {

        this.left = left;
        this.top = top;
        this.speed = speed;
        this.angle = angle;
        this.acceleration = acceleration;
    }

    /**
     * Returns the current location
     */
    public getCurrentLocation(): GameLocation {
        return { left: this.left, top: this.top };
    }

    /**
     * Increases the speed.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed *= factor;
    }

    /**
     * Update the state.
     * @param {number} tick.
     */
    public updateState(tick: number): void {
        const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = left;
        this.top = top;

        this.increaseSpeed(this.acceleration);
    }
}