/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import IGetCurrentIndex from "../Interfaces/IGetCurrentFrame";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

/**
 * Module:          CrabLocationProvider.
 * Responsibility:  A location provider where the enemy moves up by '3' then moves down '1'. Once the top is reached, the enemy appears down.
 */

const {
    gameField
} = dimensionProvider();
export default class MoveUpBitDownThenUpReappearDown implements ILocationProvider {
    /**
     * Used to calculate speed increases.
     */
    private baseSpeed: number;

    constructor(
        private left: number,
        private top: number,
        private speed: number,
        private height: number,
        private indexProvider: IGetCurrentIndex) {

        this.baseSpeed = speed;
    }

    /**
     * Increase the speed of the enemy.
     * @param {number} factor. Speed increase factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed * factor;
    }

    /**
     * Returns the current location. Note. Current is not 100% accurate here. If the enemy has passed the maxButtom, it's
     * top will be set to maxTop.
     * @returns {GameLocation}. Current game location.
     */
    public getCurrentLocation(): GameLocation {

        if (this.top < gameField.top - this.height) {
            this.top = gameField.bottom + this.height;
        }

        return getLocation(this.left, this.top, angles.up, this.speed);
    }

    /**
     * Update the state of the location provider.
     * @param {number} tick. Current game tick.
     */
    public updateState(tick: number): void {
        const { left, top } = getLocation(this.left, this.top, angles.up, this.speed);
        this.left = left;
        this.top = top;
    }
}