/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import GameLocation from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import dimensionProvider from "../Providers/DimensionProvider";
import { Frame, GameObjectType } from "../Types/Types";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          Explosion Center
 * Responsibility:  Render an explosion center.
 */

const {
    averagePixelSize,
} = dimensionProvider();

export default class ExplosionCenter extends BaseGameObject {

    /**
     * First tick passed to the draw method.
     */
    private startTick: number | undefined;

    /**
     * Time until the explosion center fizzeles out.
     */
    private burnTime: number;

    /**
     * Set to true when the fizzle time has passed.
     */
    private isBurning = true;

    /**
     * Explosion dimensions.
     */
    private dimensions: GameSize;

    /**
     * Construct the Explosion center object.
     * @param {Frame} frame. Explosion frame.
     * @param {GameLocation} location. Location where the explosion will appear.
     * @param {number} burnTime. Time in ticks how long the explosion center should remain visible.
     */
    constructor(location: GameLocation, frame: Frame,  burnTime: number) {
        super(location);

        this.currentFrameClone = cloneObject(frame);
        this.burnTime = burnTime;

        this.dimensions = getFrameDimensions(frame, averagePixelSize);
    }

    /**
     * Updates the state of the object.
     * @param {number} tick. Current tick.
     */
    public updateState(tick: number): void {
        if (this.startTick === undefined) {
            this.startTick = tick;
        }

        if (tick > this.startTick + this.burnTime) {
            this.isBurning = false;
        }
    }

    /**
     * getObjecType.
     * @returns {GameObjectType}. Explosion.
     */
    public getObjectType(): GameObjectType {
        return "explosion";
    }

    /**
     * Returns true when the explosion center should vanish from the game screen.
     * @returns {boolean}. True if the explosion center is still burning hot!
     */
    public burning(): boolean {
        return this.isBurning;
    }

    /**
     * Returns the ExplosionCenter's hitbox.
     * @returns {GameRectangle}. The hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.location, this.dimensions.width, this.dimensions.height, 0, 0);
    }
}