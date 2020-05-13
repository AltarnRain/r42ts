/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLocationProvider from "../../Base/BaseLocationProvider";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import { getLocation, getNextLocationAndAngle } from "../../Utility/Location";
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
        const { location: { left, top}, angle} = getNextLocationAndAngle(
            this.left,
            this.top,
            this.angle,
            this.speed,
            this.width,
            this.height,
            this.topLimit,
            this.bottomLimit
        );

        this.left = left;
        this.top = top;
    }
}
