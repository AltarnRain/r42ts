/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseParticle from "../Base/BaseParticle";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import dimensionProvider from "../Providers/DimensionProvider";
import { Frame, FrameProviderFunction } from "../Types/Types";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { fallsWithin, getLocation } from "../Utility/Location";

/**
 * Module:          Particle
 * Responsibility:  Render a single particle.
 */

const {
    averagePixelSize
} = dimensionProvider();

const topOffset = averagePixelSize / 2 * -1;
const bottomOffset = averagePixelSize / 2;

export default class Particle extends BaseParticle {
    /**
     * Particle angle.
     */
    protected angle: number;

    /**
     * Particle speed
     */
    protected speed: number;

    /**
     * Particle acceleration. 1 = no acceleration.
     */
    protected acceleration: number;

    /**
     * Dimensions of the particle.
     */
    private dimensions: GameSize;

    /**
     * Construct the object.
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate.
     * @param {FrameProviderFunction} getFrame. Frame for the particle.
     * @param {number} angle. Angle the particle will travel.
     * @param {number} speed. Speed at which the particle will travel.
     * @param {number} acceleration. Acceleration applies each update of the state.
     */
    constructor(left: number, top: number, getFrame: FrameProviderFunction, angle: number, speed: number, acceleration: number) {
        super(left, top);

        this.currentFrame = getFrame();
        this.angle = angle;
        this.speed = speed;
        this.acceleration = acceleration;

        this.dimensions = getFrameDimensions(this.currentFrame, averagePixelSize);
    }

    /**
     * Updates the state of the particle.
     */
    public updateState(): void {
        const location = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = location.left;
        this.top = location.top;
        this.speed *= this.acceleration;
    }

    /**
     * Returns true if the particle is traveling.
     * @returns {boolean}. True if the particle is in the game field.
     */
    public traveling(): boolean {
        const {
            gameFieldTop,
            fullWidth,
            fullHeight,
        } = dimensionProvider();

        return fallsWithin(this.left, this.top, gameFieldTop, fullHeight, 0, fullWidth);
    }

    /**
     * Returns the particles hitbox.
     * @returns {GameRectangle}. The hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.left, this.top, this.dimensions.width, this.dimensions.height, topOffset, bottomOffset);
    }
}
