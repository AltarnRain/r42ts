/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          SideToSideUpAndDown
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

const {
    gameFieldTop,
    fullWidth,
    maxPixelSize,
    fullHeight
} = dimensionProvider();

export default class SideToSideUpAndDown extends BaseLocationProvider {
    public getLocation(left: number, top: number, width: number, height: number): { left: number, top: number} {
        const leftLimit = maxPixelSize * 2;
        const rightLimit = fullWidth - width - maxPixelSize * 2;

        if (left <= leftLimit || left >= rightLimit) {
            this.angle = 180 - this.angle;
        }

        if (top <= gameFieldTop  || top >= fullHeight - height) {
            this.angle *= -1;
        }

        return getLocation(left, top, this.angle, this.speed);
    }
}
