/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import { GameLocation } from "../Models/GameLocation";
import { getLocation } from "../Utility/Location";
import { getUpOrDownFromAngle } from "../Utility/Geometry";

/**
 * Module:          MoveToMaxThenReset
 * Responsibility:  A location provider where the enemy moves down to a certain point and then reappears resets to a specified location.
 */

export default class MoveToUpDownMaxThenReset extends BaseLocationProvider {

    constructor(
        left: number,
        top: number,
        speed: number,
        angle: number,
        width: number,
        height: number,
        private target: number,
        private reset: number) {
        super(left, top, speed, angle, width, height);
    }

    /**
     * Returns the current location.
     * @returns {GameLocation}. Current game location.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top,
        };
    }

    /**
     * Update the state of the location provider.
     * @param {number} tick. Current game tick.
     */
    public updateState(tick: number): void {
        const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);

        this.left = left;
        let newTop = top;

        const direction = getUpOrDownFromAngle(this.angle);

        if (direction === "up") {
            if (newTop < this.target - this.height) {
                newTop = this.reset;
            }
        } else if (direction === "down") {
            if (newTop + this.height > this.target) {
                newTop = this.reset;
            }
        }

        this.top = newTop;
    }
}