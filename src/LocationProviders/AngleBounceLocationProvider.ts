/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { getNextLocationAndAngle } from "../Utility/Location";

/**
 * Module:          AngleBounceLocationProvider
 * Responsibility:  Location provider for enemies that move within provided boundaries and 'bounce' when they hit a side.
 */

export default class AngleBounceLocationProvider extends BaseLocationProvider implements ILocationProvider {
    /**
     * Construct the object.
     * @param {number} left. Initilal left.
     * @param {number} top.  Initial top.
     * @param {number} speed. Initial speed.
     * @param {number} angle. Initial angle.
     * @param {number} width. Object width
     * @param {number} height. Object height.
     * @param {number} topLimit. Top boundary limit.
     * @param {number} bottomLimit. Bottom boundary limit.
     */
    constructor(
        left: number,
        top: number,
        speed: () => number,
        angle: number,
        width: number,
        height: number,
        private topLimit: number,
        private bottomLimit: number) {
        super(left, top, speed, angle, width, height);
    }

    /**
     * Update the location provider's state.
     * @param {number} tick. Current tick
     */
    public updateState(tick: number): void {
        const { location: { left, top }, angle } = getNextLocationAndAngle(
            this.left,
            this.top,
            this.angle,
            this.speed,
            this.width,
            this.height,
            this.topLimit,
            this.bottomLimit
        );

        this.left = left;
        this.top = top;
        this.angle = angle;
    }
}
