/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseParticle from "../Base/BaseParticle";
import GameLocation from "../Models/GameLocation";
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
     * @param {GameLocation} startLocation. Initial location of the particle.
     * @param {Frame} frame. Frame for the particle.
     * @param {number} angle. Angle the particle will travel.
     * @param {number} speed. Speed at which the particle will travel.
     * @param {number} acceleration. Acceleration applies each update of the state.
     */
    constructor(startLocation: GameLocation, getFrame: FrameProviderFunction, angle: number, speed: number, acceleration: number) {
        super(startLocation);

        this.currentFrameClone = getFrame();
        this.angle = angle;
        this.speed = speed;
        this.acceleration = acceleration;

        this.dimensions = getFrameDimensions(this.currentFrameClone, averagePixelSize);
    }

    /**
     * Updates the state of the particle.
     */
    public updateState(): void {
        this.location = getLocation(this.location, this.angle, this.speed);
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

        return fallsWithin(this.location, gameFieldTop, fullHeight, 0, fullWidth);
    }

    /**
     * Returns the particles hitbox.
     * @returns {GameRectangle}. The hitbox.
     */
    public getHitbox(): GameRectangle {
        return getFrameHitbox(this.location, this.dimensions.width, this.dimensions.height, topOffset, bottomOffset);
    }
}
