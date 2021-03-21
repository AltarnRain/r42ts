/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import IGetCurrentIndex from "../Interfaces/IGetCurrentFrame";
import ILocationProvider from "../Interfaces/ILocationProvider";
import GameLocation from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import Angle from "../Types/Angle";
import { getLocation } from "../Utility/Location";

/**
 * Module:          CrabLocationProvider.
 * Responsibility:  A location provider where the enemy moves up by '3' then moves down '1'. Once the top is reached, the enemy appears down.
 */

const {
    gameField
} = dimensionProvider();
export default class CrabLocationProvider implements ILocationProvider {
    /**
     * Used to calculate speed increases.
     */
    private baseSpeed: () => number;

    /**
     * Current angle. Can be up or down, depending on the frame.
     */
    private angle: Angle;
    private speed: number;

    /**
     * Construct the object.
     * @param {number} left. Initial left position.
     * @param {number} top. Initial top position.
     * @param {number} speed. Initial speed.
     * @param {number} height. Height of the enemy.
     * @param {IGetCurrentIndex} indexProvider. Returns the current animation frame index.
     */

    constructor(
        private left: number,
        private top: number,
        speed: () => number,
        private height: number,
        private indexProvider: IGetCurrentIndex) {

        this.baseSpeed = speed;
        this.angle = angles.up;
        this.speed = speed();
    }

    /**
     * Increase the speed of the enemy.
     * @param {number} factor. Speed increase factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed() * factor;
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

        if (top < gameField.top - this.height) {
            this.top = gameField.bottom + this.height;
        } else {
            this.top = top;
        }

        // 4/6 move up. 2/6 frames move down.
        if (this.indexProvider.getCurrentIndex() < 5 || this.top > gameField.bottom) {
            this.angle = angles.up;
        } else {
            this.angle = angles.down;
        }
    }
}