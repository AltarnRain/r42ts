/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import ILocationProvider from "../Base/ILocationProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";

/**
 * Module:          Left to right, then left.
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

const {
    gameFieldTop,
    fullWidth,
} = dimensionProvider();

export default class VanishRightAppearLeftLocationProvider extends BaseLocationProvider implements ILocationProvider {

    public updateState(tick: number): void {
        super.updateState(tick);

        if (this.left + this.width > fullWidth) {
            this.left = 0;
        }

        if (this.top > fullWidth * 0.5) {
            this.top = gameFieldTop + this.height;
        }

        const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = left;
        this.top = top;
    }
}
