/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Left to right, then left.
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import GameLocation from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

const {
    gameFieldTop,
    fullWidth,
} = dimensionProvider();

export default class VanishRightAppearLeft extends BaseLocationProvider {
    public getLocation(location: GameLocation, width: number, height: number): GameLocation {

        if (location.left + width > fullWidth) {
            location.left = 0;
        }

        if (location.top > fullWidth * 0.5) {
            location.top = gameFieldTop + height;
        }

        return getLocation(location, this.angle, this.speed);
    }
}
