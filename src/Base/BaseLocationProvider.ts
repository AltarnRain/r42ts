/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";

/**
 * Module:          BaseLocationProvider
 * Responsibility:  Base for all location providers.
 */

export default abstract class BaseLocationProvider {

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

    /**
     * Construct the class
     * @param {number} speed. Speed to start with.
     * @param {number} angle. Initial angle.
     */
    constructor(speed: number, angle: number) {
        this.angle = angle;
        this.speed = speed;
        this.baseSpeed = speed;
    }

    /**
     * Returns a location. Implement specific movement behaviours in a diriving class.
     * @param {GameLocation} location. Location to base the next location on.
     * @param {number} width. Width of the object.
     * @param {number} height. Height of the object.
     */
    public abstract getLocation(location: GameLocation, width: number, height: number): GameLocation;

    /**
     * increases the speed by the provided factor.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed * factor;
    }
}