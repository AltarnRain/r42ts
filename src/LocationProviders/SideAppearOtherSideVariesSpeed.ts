/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import IGetCurrentIndex from "../Interfaces/IGetCurrentFrame";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import { getNextLocationWithinBoundaries } from "../Utility/Location";

/**
 * Module:          SideAppearOtherSideVariesSpeed
 * Responsibility:  A location provider where the enemies move to one side and reappear at the other side, but depending on the current frame have different movement
 *                  speeds
 */

export default class SideAppearOtherSideVariesSpeed implements ILocationProvider {
    /**
     * Used to calculate a speed increase for the slow speed.
     */
    private baseSlowSpeed: number;

    /**
     * Used to calculate a speed increase for the fast speed.
     */
    private baseFastSpeed: number;

    /**
     * Construct the object
     * @param {number} left. Initial left.
     * @param {number} top. Initial top.
     * @param {number} angle. Initial angle.
     * @param {number} width. Object width.
     * @param {number} height. Object height
     * @param {number} maxTop. Maximum top position.
     * @param {number} maxBottom. Maximum bottom position.
     * @param {IGetCurrentIndex} indexProvider. Provides the current frame index.
     * @param {number} slowSpeed. Movement speed for slow frames.
     * @param {number} fastSpeed. Movement speed for fast frames.
     * @param {number[]} slowFrames. Which frame indexes to use the slowSpeed for.
     * @param {number[]} fastFrames. Which frame indexes to use the fast speed for.
     */
    constructor(
        private left: number,
        private top: number,
        private angle: number,
        private width: number,
        private height: number,
        private maxTop: number,
        private maxBottom: number,
        private indexProvider: IGetCurrentIndex,
        private slowSpeed: number,
        private fastSpeed: number,
        private slowFrames: number[],
        private fastFrames: number[]) {

        this.baseSlowSpeed = slowSpeed;
        this.baseFastSpeed = fastSpeed;
    }

    /**
     * Retusn the current location
     * @returns {GameLocation}. Current location.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top
        };

    }

    /**
     * Update the state of the location provides.
     * @param {number} tick. Current tick
     */
    public updateState(tick?: number): void {
        const currentFrameIndex = this.indexProvider.getCurrentIndex();

        let speed = 0;
        if (this.slowFrames.indexOf(currentFrameIndex) > -1) {
            speed = this.slowSpeed;
        } else if (this.fastFrames.indexOf(currentFrameIndex) > -1) {
            speed = this.fastSpeed;
        } else {
            throw new Error("Index " + currentFrameIndex + " was not found in the slowFrames or fastFrames array");
        }

        const { left, top } = getNextLocationWithinBoundaries(
            this.left,
            this.top,
            this.width,
            this.angle,
            speed,
            this.maxTop - this.height,
            this.maxBottom + this.height
        );

        this.left = left;
        this.top = top;
    }

    /**
     * increases the speed by the provided factor.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.slowSpeed = this.baseSlowSpeed * factor;
        this.fastSpeed = this.baseFastSpeed * factor;
    }
}