/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import ILocationProvider from "../Interfaces/ILocationProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

/**
 * Module:          SideToSideUpAndDown
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

const {
    gameFieldTop,
    pixelSize,
    fullGameHeight,
    fullGameWidth,
} = dimensionProvider();

export default class SideToSideUpAndDownLocationProvider extends BaseLocationProvider implements ILocationProvider {

    public updateState(tick: number): void {
        super.updateState(tick);
        const leftLimit = pixelSize * 2;
        const rightLimit = fullGameWidth - this.width - pixelSize * 2;

        if (this.left <= leftLimit || this.left >= rightLimit) {
            this.angle = 180 - this.angle;
        }

        if (this.top <= gameFieldTop || this.top >= fullGameHeight - this.height) {
            this.angle *= -1;
        }

        const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = left;
        this.top = top;
    }
}
