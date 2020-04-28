/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";
import { GameLocation } from "../Models/GameLocation";

/**
 * Module:          Left to right, then left.
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

const {
    gameFieldTop,
    fullWidth,
} = dimensionProvider();

export default class VanishRightAppearLeft extends BaseLocationProvider {
    public getLocation(left: number, top: number, width: number, height: number): GameLocation {

        if (left + width > fullWidth) {
            left = 0;
        }

        if (top > fullWidth * 0.5) {
            top = gameFieldTop + height;
        }

        return getLocation(left, top, this.angle, this.speed);
    }
}
