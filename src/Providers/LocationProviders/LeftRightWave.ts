/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../../Interfaces/ILocationProvider";
import { GameLocation } from "../../Models/GameLocation";
import { getLocation, fallsWithinGameField } from "../../Utility/Location";
import { angles } from "../../Constants/Angles";
import dimensionProvider from "../DimensionProvider";

/**
 * Module:          LeftRightWave
 * Responsibility:  Enemies reverse angle when they hit a side. The also move up in down in a wave.
 *                  but they do not move downwads or upwards.
 */

const {
    gameField
} = dimensionProvider();

export default class LeftRightWave implements ILocationProvider {
    private left: number;
    private top: number;
    private speed: number;
    private baseSpeed: number;
    private angle: number;
    private width: number;

    /**
     *
     */
    constructor(left: number, top: number, width: number, speed: number, startDirection: "left" | "right") {
        this.left = left;
        this.top = top;
        this.width = width;
        this.speed = speed;
        this.baseSpeed = speed;
        this.angle = startDirection === "right" ? angles.right : angles.left;
    }

    public getCurrentLocation(): GameLocation {
        throw new Error("Method not implemented.");
    }
    public updateState(tick?: number | undefined): void {

        const nextLocation = getLocation(this.left, this.top, this.angle, this.speed);

        if (nextLocation.left < gameField.left) {
            this.angle = angles.right;
        } else if (nextLocation.left + this.width > nextLocation.left) {
            this.angle = angles.left;
        }

    }

    /**
     * increases the speed by the provided factor.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed * factor;
    }
}