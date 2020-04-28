/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameRectangle } from "../Models/GameRectangle";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { GameLocation } from "../Models/GameLocation";

/**
 * Module:          BaseGameObject
 * Responsibility:  Base class for all game objects.
 */

export default abstract class BaseGameObject {
    /**
     * Game object left location.
     */
    protected left: number;

    /**
     * Game object top location.
     */
    protected top: number;

    /**
     * Current frame of the object
     */
    protected currentFrame!: Frame;

    /**
     * Construct the object.
     * @param {Location?} location. A location. Optional. Some objects determine their own location.
     */
    constructor(left: number, top: number) {
        this.left = left;
        this.top = top;
    }

    /**
     * Animate the object
     */
    public draw(): void {
        renderFrame(this.left, this.top, this.currentFrame);
    }

    /**
     * Called to update the state of the object. Runs outside the draw loop for more accuracy.
     * @param {number} tick. The current tick. Can be used to handle state updates that have a certain frequency.
     */
    public abstract updateState(tick: number): void;

    /**
     * Get the game location for colision detection.
     * @returns {Location}. The location of the object.
     */
    public getLocation(): GameLocation {
        return { left: this.left, top: this.top };
    }

    /**
     * Returns the object type.
     * @returns {GameObjectType}. The type of object.
     */
    public abstract getObjectType(): GameObjectType;

    /**
     * Returns the object's hitbox.
     * @returns {GameRectangle}. The hitbox of the object.
     */
    public abstract getHitbox(): GameRectangle;
}
