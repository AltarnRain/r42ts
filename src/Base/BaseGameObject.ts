/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";

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
     * Current frame of the object
     */
    protected currentFrame!: Frame;

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
    public draw(tick: number): void {
        renderFrame(this.location, this.currentFrame);
    }

    /**
     * Called to update the state of the object. Runs outside the draw loop for more accuracy.
     */
    public abstract updateState(tick: number): void;

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
    public abstract getHitbox(): GameRectangle;
}
