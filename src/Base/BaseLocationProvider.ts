/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";

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
     * Initial speed for the enemy. Used o calculate speed increases.
     */
    protected baseSpeed: number;

    /**
     * The width of the enemy. Used to determine if an enemy is moving off the screen.
     */
    protected width: number;

    /**
     * Height of the enemy. Also used to determine if an enemy is moving off screen.
     */
    protected height: number;

    /**
     * Left position of the enemy.
     */
    protected left: number;

    /**
     * Top position of the enemy.
     */
    protected top: number;

    /**
     * Initialize the object.
     * @param {number} left. Inital left.
     * @param {number} top. Initial top.
     * @param {number} speed. Initial speed.
     * @param {number} angle. Movement angle.
     * @param {number} width. Width of the enemy.
     * @param {number} height. Height of the enemy.
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
        return { left: this.left, top: this.top };
    }

    /**
     * Updates the state of the location provider.
     * @param {number} tick. Current tick
     */
    public abstract updateState(tick: number): void;

    /**
     * increases the speed by the provided factor.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed * factor;
    }
}
