/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import { getLocation } from "../Utility/Location";

/**
 * Module:          CrabLocationProvider. 
 * Responsibility:  A location provider where the enemy moves up by '3' then moves down '1'. Once the top is reached, the enemy appears down.
 */

export default class MoveUpBitDownThenUpReappearDown implements ILocationProvider {

    constructor(
        private left: number,
        private top: number,
        private speed: number,
        private angle: number,
        private height: number,
        private maxTop: number,
        private maxBottom: number) {

    }
    public increaseSpeed(factor: number): void {
        throw new Error("Method not implemented.");
    }

    /**
     * Returns the current location. Note. Current is not 100% accurate here. If the enemy has passed the maxButtom, it's
     * top will be set to maxTop.
     * @returns {GameLocation}. Current game location.
     */
    public getCurrentLocation(): GameLocation {

        if (this.top + this.height > this.maxBottom) {
            this.top = this.maxTop;
        }

        return getLocation(this.left, this.top, this.angle, this.speed);
    }

    /**
     * Update the state of the location provider.
     * @param {number} tick. Current game tick.
     */
    public updateState(tick: number): void {
        const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = left;
        this.top = top;
    }
}