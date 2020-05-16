/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import { getNextLocationWithinBoundaries } from "../Utility/Location";

/**
 * Module:          Left to right, then left.
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

export default class SideAppearOtherSide extends BaseLocationProvider {
    constructor(
        left: number,
        top: number,
        speed: number,
        angle: number,
        width: number,
        height: number,
        private maxTop: number,
        private maxBottom: number) {
        super(left, top, speed, angle, width, height);
    }

    /**
     * Update the state of the location provider.
     * @param {number} tick. Current tick.
     */
    public updateState(tick: number): void {
        const { left, top } = getNextLocationWithinBoundaries(
            this.left,
            this.top,
            this.width,
            this.angle,
            this.speed,
            this.maxTop,
            this.maxBottom
        );

        this.left = left;
        this.top = top;
    }
}
