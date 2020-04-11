/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import GameLocation from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/Gamesize";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          Explosion Center
 * Responsibility:  Render an explosion center.
 */

const {
    averagePixelSize,
} = DimensionProvider();

export default class ExplosionCenter extends BaseGameObject {

    /**
     * First tick passed to the draw method.
     */
    private startTick: number | undefined;

    /**
     * Time until the explosion center fizzeles out.
     */
    private fizzleTime: number;

    /**
     * Set to true when the fizzle time has passed.
     */
    private fizzled = false;

    /**
     * Explosion dimensions.
     */
    private dimensions: GameSize;

    /**
     * Construct the Explosion center object.
     * @param {Frame} frame. Explosion frame.
     * @param {GameLocation} location. Location where the explosion will appear.
     * @param {number} fizzleTime. Time in ticks how long the explosion center should remain visible.
     */
    constructor(frame: Frame, location: GameLocation, fizzleTime: number) {
        super(location);

        this.currentFrame = cloneObject(frame);
        this.fizzleTime = fizzleTime;

        this.dimensions = getFrameDimensions(frame, averagePixelSize);
    }

    /**
     * Updates the state of the object.
     */
    public updateState(tick: number): void {
        if (this.startTick === undefined) {
            this.startTick = tick;
        }

        if (tick > this.startTick + this.fizzleTime) {
            this.fizzled = true;
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
     */
    public fizzledOut(): boolean {
        return this.fizzled;
    }

    /**
     * Returns the ExplosionCenter's hitbox.
     * @returns {GameRectangle}. The hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.location, this.dimensions.width, this.dimensions.height, 0, 0);
    }
}