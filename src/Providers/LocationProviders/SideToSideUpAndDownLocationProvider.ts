/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../../Base/BaseLocationProvider";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import { getLocation } from "../../Utility/Location";
import dimensionProvider from "../DimensionProvider";

/**
 * Module:          SideToSideUpAndDown
 * Responsibility:  Location provider for enemies that move from left to right and up then down.
 */

const {
    gameField,
} = dimensionProvider();

export default class SideToSideUpAndDownLocationProvider extends BaseLocationProvider implements ILocationProvider {
    private bottomLimit: number;
    private topLimit: number;

    constructor(left: number, top: number, speed: number, angle: number, width: number, height: number, topLimit: number, bottomLimit: number) {
        super(left, top, speed, angle, width, height);

        this.topLimit = topLimit;
        this.bottomLimit = bottomLimit;
    }

    public updateState(tick: number): void {
        super.updateState(tick);

        if (this.left <= gameField.left || this.left + this.width >= gameField.right) {
            this.angle = 180 - this.angle;
        }

        if (this.top <= this.topLimit || this.top >= this.bottomLimit - this.height) {
            this.angle *= -1;
        }

        const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = left;
        this.top = top;
    }
}
