/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import { GameLocation } from "../Models/GameLocation";
import { getLocation } from "../Utility/Location";

/**
 * Module:          MoveDownAppearUp
 * Responsibility:  A location provider where the enemy moves down to a certain point and then reappears at the top of the screen.
 *                  Enemies will bounce from up to down a few times just like the original game.
 */

export default class MoveDownAppearUp extends BaseLocationProvider {

    /**
     * Maximum top.
     */
    private maxTop: number;

    /**
     * Maximum bottom.
     */
    private maxBottom: number;

    constructor(left: number, top: number, speed: number, angle: number, width: number, height: number, maxTop: number, maxBottom: number) {
        super(left, top, speed, angle, width, height);

        this.maxTop = 0;
        this.maxBottom = maxBottom;
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