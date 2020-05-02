/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

/**
 * Module:          MoveDownAppearUp
 * Responsibility:  A location provider where the enemy moves down to a certain point and then reappears at the top of the screen.
 *                  Enemies will bounce from up to down a few times just like the original game.
 */

const {
    pixelSize,
    gameField
} = dimensionProvider();

export default class MoveDownAppearUpLocationProvider extends BaseLocationProvider implements ILocationProvider {
    /**
     * The limit to how far the enemy will travel before its position is set to the top position.
     */
    private bottomLimit: number;

    /**
     * Constructs the immobile location provider.
     */
    constructor(gamePixelsFromBottom: number, left: number, top: number, speed: number, angle: number, width: number, height: number) {
        super(left, top, speed, angle, width, height);

        this.bottomLimit = gamePixelsFromBottom * pixelSize;
    }

    /**
     * Returns the given location.
     */
    public getCurrentLocation(): GameLocation {

        if (this.top + this.height > this.bottomLimit) {
            this.top = gameField.top + this.height;
        }

        return getLocation(this.left, this.top, this.angle, this.speed);
    }
}