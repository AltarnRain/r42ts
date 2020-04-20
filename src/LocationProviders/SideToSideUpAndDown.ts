/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

/**
 * Module:          SideToSideUpAndDown
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

const {
    gameFieldTop,
    fullWidth,
    maxPixelSize,
    fullHeight
} = DimensionProvider();

export default class SideToSideUpAndDown extends BaseLocationProvider {
    public getLocation(location: GameLocation, width: number, height: number): GameLocation {
        const leftLimit = maxPixelSize * 2;
        const rightLimit = fullWidth - width - maxPixelSize * 2;

        if (location.left <= leftLimit || location.left >= rightLimit) {
            this.angle = 180 - this.angle;
        }

        if (location.top <= gameFieldTop  || location.top >= fullHeight - height) {
            this.angle *= -1;
        }

        return getLocation(location, this.angle, this.speed);
    }
}
