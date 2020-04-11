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
import { fallsWithin, getNewLocation } from "../Utility/Location";

/**
 * Module:          Particle
 * Responsibility:  Render a single particle.
 */

const {
    averagePixelSize
} = DimensionProvider();

const topOffset = averagePixelSize / 2 * -1;
const bottomOffset = averagePixelSize / 2;

export default class Particle extends BaseGameObject {

    /**
     * Frame of the particle.
     */
    protected frame: Frame;

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
     * Construct the particle.
     */
    constructor(frame: Frame, angle: number, speed: number, acceleration: number, location: GameLocation) {
        super(location);

        this.frame = cloneObject(frame);
        this.angle = angle;
        this.speed = speed;
        this.acceleration = acceleration;

        this.dimensions = getFrameDimensions(frame, averagePixelSize);
    }

    /**
     * Returns the object type.
     * @returns {GameObjectType}. The game object type.
     */
    public getObjectType(): GameObjectType {
        return "particle";
    }

    /**
     * Draw the particle
     */
    public draw(_: number): void {
        renderFrame(this.location, this.frame);
    }

    /**
     * Updates the state of the particle.
     */
    public updateState(): void {
        this.location = getNewLocation(this.location, this.angle, this.speed);
        this.speed *= this.acceleration;
    }

    /**
     * Returns true if the particle is still in the game field.
     * @returns {boolean}. True if the particle is in the game field.
     */
    public inScreen(): boolean {
        const {
            gameFieldTop,
            fullWidth,
            fullHeight,
        } = DimensionProvider();

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
