/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import { getLocation } from "../Utility/Location";

/**
 * Module:          MoveDownAppearUp
 * Responsibility:  A location provider where the enemy moves down to a certain point and then reappears at the top of the screen.
 *                  Enemies will bounce from up to down a few times just like the original game.
 */

export default class MoveDownAppearUpLocationProvider extends BaseLocationProvider implements ILocationProvider {
    private maxTop: number;
    private maxBottom: number;

    /**
     * Constructs the immobile location provider.
     */
    constructor(left: number, top: number, speed: number, angle: number, width: number, height: number, maxTop: number, maxBottom: number) {
        super(left, top, speed, angle, width, height);

        this.maxTop = maxTop;
        this.maxBottom = maxBottom;
    }

    /**
     * Returns the given location.
     */
    public getCurrentLocation(): GameLocation {

        if (this.top + this.height > this.maxBottom) {
            this.top = this.maxTop;
        }

        return getLocation(this.left, this.top, this.angle, this.speed);
    }
}