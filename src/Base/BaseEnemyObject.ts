/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Base class for enemies.
 * Responsibility:  Base class for enemies.
 */

import GameLocation from "../Models/GameLocation";
import { BaseDestructableObject } from "./BaseDestructableObject";

export abstract class BaseEnemyObject extends BaseDestructableObject {

    /**
     * Enemy speed.
     */
    protected speed: number;

    /**
     * Construct the object.
     * @param {number} speed. Speed of the enemy.
     */
    constructor(speed: number) {
        super();
        this.speed = speed;
    }

    /**
     * Returns the point worth.
     * @returns {number}. Point worth of the enemy.
     */
    public abstract getPoints(): number;

    /**
     * Set the speed of the enemy.
     * @param {Number} value.
     */
    public setSpeed(value: number): void {
        this.speed = value;
    }

    /**
     * Returns the enemies hitpoints.
     */
    public abstract getHitpoints(): number;

    public abstract getCenterLocation(): GameLocation;
}