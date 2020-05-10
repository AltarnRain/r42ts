/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../../Constants/Angles";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import { GameLocation } from "../../Models/GameLocation";
import { getLocation } from "../../Utility/Location";
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
     * Constants the location provider.
     * @param {number} left. The left coordinate.
     * @param {number} top. The top coordinate.
     * @param {number} width. The object width.
     * @param {number} speed. The speed.
     * @param {"left" | "right"} startDirection. Sets the initial direction of the object.
     */
    constructor(left: number, top: number, width: number, speed: number, startDirection: "left" | "right") {
        this.left = left;
        this.top = top;
        this.width = width;
        this.speed = speed;
        this.baseSpeed = speed;
        this.angle = startDirection === "right" ? angles.right : angles.left;
    }

    /**
     * Returns the current location
     * @param {GameLocation}. The current location.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top
        };
    }

    /**
     * Updates the current state.
     * @param {number} tick. Current game tick.
     */
    public updateState(tick?: number | undefined): void {

        const nextLocation = getLocation(this.left, this.top, this.angle, this.speed);

        // flip the angle when the object reaches the outer limit.
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