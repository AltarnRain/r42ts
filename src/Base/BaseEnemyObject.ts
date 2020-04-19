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
import { GameObjectType } from "../Types/Types";
import { BaseDestructableObject } from "./BaseDestructableObject";

export abstract class BaseEnemyObject extends BaseDestructableObject {

    /**
     * Enemy speed.
     */
    protected currentSpeed: number;

    /**
     * The original speed of the object.
     */
    protected baseSpeed: number;

    /**
     * Construct the object.
     * @param {number} speed. Speed of the enemy.
     */
    constructor(location: GameLocation, speed: number) {
        super(location);
        this.currentSpeed = speed;
        this.baseSpeed = speed;
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
        this.currentSpeed = value;
    }

    /**
     * increases the speed of an enemy. Uses the base speed to calculate a new speed.
     * @param {number} value. Values below 1 decrease speed, values above 1 increase speed.
     */
    public increaseSpeed(value: number): void {
        this.currentSpeed = this.baseSpeed * value;
    }

    /**
     * Returns the enemies hitpoints. Returns 0 by default. Only meteorites have hitpoints.
     */
    public getHitpoints(): number {
        return 0;
    }

    /**
     * Returns the center of the
     */
    public abstract getCenterLocation(): GameLocation;

    /**
     * Always an enemy
     */
    public getObjectType(): GameObjectType {
        return "enemy";
    }
}