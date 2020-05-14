/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import IGetCurrentIndex from "../Interfaces/IGetCurrentFrame";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
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
    constructor(
        private left: number,
        private top: number,
        private angle: number,
        private width: number,
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

    public getCurrentLocation(): GameLocation {
        return { left: this.left, top: this.top };

    }
    public updateState(tick?: number | undefined): void {
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
            this.maxTop,
            this.maxBottom
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