/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import { getNextLocationWithinBoundaries } from "../Utility/Location";

/**
 * Module:          SideAppearOthrerSise
 * Responsibility:  Location provider for enemies that move from left to right or right to left and appear on the oposite side.
 *                  These enemies can move slowly up or down. If the do their top position will be reset.
 */

export default class SideAppearOtherSide extends BaseLocationProvider {

    /**
     * Construct the object
     * @param {number} left. Initial left.
     * @param {number} top. Initial top.
     * @param {number} speed. Initial speed.
     * @param {number} angle. Initial angle.
     * @param {number} width. Enemy width.
     * @param {number} height. Enemy height
     * @param {number} maxTop. Maximum top position.
     * @param {number} maxBottom. Maximum bottom position.
     */
    constructor(
        left: number,
        top: number,
        speed: () => number,
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
