/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import GameLocation from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

/**
 * Module:          MoveDownAppearUp
 * Responsibility:  A location provider where the enemy moves down to a certain point and then reappears at the top of the screen.
 */

const {
    averagePixelSize,
    gameFieldTop,
} = dimensionProvider();

export default class MoveDownAppearUp extends BaseLocationProvider {
    /**
     * The limit to how far the enemy will travel before its position is set to the top position.
     */
    private bottomLimit: number;

    /**
     * Constructs the immobile location provider.
     */
    constructor(gamePixelsFromBottom: number, speed: number, angle: number) {
        super(speed, angle);

        this.bottomLimit = gamePixelsFromBottom * averagePixelSize;
    }

    /**
     * Returns the given location.
     */
    public getLocation(location: GameLocation, width: number, height: number): GameLocation {
        const bottomLimit = this.bottomLimit - height;

        if (location.top > bottomLimit) {
            location.top = gameFieldTop + height;
        }

        return getLocation(location, this.angle, this.speed);
    }
}