/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { Hitbox } from "../Models/Hitbox";
import { GameObjectType } from "../Types/Types";

/**
 * Module:          BaseGameObject
 * Responsibility:  Base class for all enemies.
 */

export default abstract class BaseGameObject {
    /**
     * Game object location.
     */
    protected location!: GameLocation;

    /**
     * Construct the object.
     * @param {Location?} location. A location. Optional. Some objects determine their own location.
     */
    constructor(location?: GameLocation) {
        if (location) {
            this.location = {...location};
        }
    }

    /**
     * Animate the object
     * @param {number} tick. Current tick.
     */
    public abstract draw(tick: number): void;

    /**
     * Get the game location for colision detection.
     */
    public getLocation(): GameLocation {
        return this.location;
    }

    /**
     * Returns the object type.
     */
    public abstract getObjectType(): GameObjectType;

    /**
     * Returns the object's hitbox.
     */
    public abstract getHitbox(): Hitbox;
}
