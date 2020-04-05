/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import GameLocation from "../Models/GameLocation";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          Explosion Center
 * Responsibility:  Render an explosion center.
 */

export default class ExplosionCenter extends BaseGameObject {

    /**
     * First tick passed to the draw method.
     */
    private startTick: number | undefined;

    /**
     * Explosion center frame.
     */
    private frame: Frame;

    /**
     * Time until the explosion center fizzeles out.
     */
    private fizzleTime: number;

    /**
     * Set to true when the fizzle time has passed.
     */
    private fizzled = false;

    /**
     * Construct the Explosion center object.
     * @param {Frame} frame. Explosion frame.
     * @param {GameLocation} location. Location where the explosion will appear.
     * @param {number} fizzleTime. Time in ticks how long the explosion center should remain visible.
     */
    constructor(frame: Frame, location: GameLocation, fizzleTime: number) {
        super(location);

        this.frame = cloneObject(frame);
        this.fizzleTime = fizzleTime;
    }

    /**
     * Draws the explosion center.
     * @param {number} tick. Current tick.
     */
    public draw(tick: number): void {
        if (this.startTick === undefined) {
            this.startTick = tick;
        }

        if (tick > this.startTick + this.fizzleTime) {
            this.fizzled = true;
        }

        renderFrame(this.location, this.frame);
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
     * Retuns the explosion center frame
     * @returns {Frame}. Explosion center frame.
     */
    public getCurrentFrame(): Frame {
        return this.frame;
    }
}