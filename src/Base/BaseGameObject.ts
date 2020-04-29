/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import ILocationProvider from "./ILocationProvider";

/**
 * Module:          BaseGameObject
 * Responsibility:  Base class for all game objects.
 */

export default abstract class BaseGameObject {
    /**
     * Current frame of the object
     */
    protected currentFrame!: Frame;

    /**
     * Provides location. Can be used to alter the movement behaviour of enemies.
     */
    protected locationProvider: ILocationProvider;

    /**
     * Construct the object.
     * @param {Location?} location. A location. Optional. Some objects determine their own location.
     */
    constructor(locationProvider: ILocationProvider) {
        this.locationProvider = locationProvider;
    }

    /**
     * Animate the object
     */
    public draw(): void {
        const { left, top } = this.getLocation();
        renderFrame(left, top, this.currentFrame);
    }

    /**
     * Called to update the state of the object. Runs outside the draw loop for more accuracy.
     * @param {number} tick. The current tick. Can be used to handle state updates that have a certain frequency.
     */
    public updateState(tick?: number): void {
        this.locationProvider.updateState(tick);
    }

    /**
     * Get the game location for colision detection.
     * @returns {Location}. The location of the object.
     */
    public abstract getLocation(): GameLocation;

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
