/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { getNextLocationAndAngle } from "../Utility/Location";

/**
 * Module:          SideToSideUpAndDown
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

export default class SideToSideUpAndDownLocationProvider extends BaseLocationProvider implements ILocationProvider {

    constructor(
        left: number,
        top: number,
        speed: number,
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
