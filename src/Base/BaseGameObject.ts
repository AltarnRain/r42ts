/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import GameObjectType from "../Types/GameObject";

/**
 * Module:          IDraw
 * Responsibility:  Contract for a class that has something that can be drawn.
 */

export default abstract class BaseGameObject {
    /**
     * Game object location.
     */
    protected location: GameLocation;

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
     * Get the explosion asset for this object. Returns undefined if the game object doesn't have an explosion.
     * For example: bullets and particles.
     */
    public abstract getExplosion(): Explosion | undefined;

    /**
     * Returns the object type.
     */
    public abstract getObjectType(): GameObjectType;
}
