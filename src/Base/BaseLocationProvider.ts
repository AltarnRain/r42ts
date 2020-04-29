/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getLocation } from "../Utility/Location";
import ILocationProvider from "./ILocationProvider";

const {
    averagePixelSize
} = dimensionProvider();

export default abstract class BaseLocationProvider implements ILocationProvider {

    /**
     * Angle. Can change and be used to bounce enemies of the sides and bottom.
     */
    protected angle: number;

    /**
     * Speed the enemy travels at.
     */
    protected speed: number;

    /**
     * Initial speed for the enemy.
     */
    protected baseSpeed: number;
    protected width: number;
    protected height: number;
    protected left: number;
    protected top: number;

    /**
     * Construct the class
     * @param {number} speed. Speed to start with.
     * @param {number} angle. Initial angle.
     */
    constructor(left: number, top: number, speed: number, angle: number, width: number, height: number) {
        this.left = left;
        this.top = top;
        this.angle = angle;
        this.speed = speed;
        this.baseSpeed = speed;
        this.width = width;
        this.height = height;
    }

    /**
     * Returns a location. Implement specific movement behaviours in a diriving class.
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate.
     * @param {number} width. Width of the object.
     * @param {number} height. Height of the object.
     */
    public getCurrentLocation(): GameLocation {
        return {left: this.left, top: this.top };
    }

    public updateState(tick: number): void {
        const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = left;
        this.top = top;
    }

    /**
     * increases the speed by the provided factor.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed * factor;
    }
}
