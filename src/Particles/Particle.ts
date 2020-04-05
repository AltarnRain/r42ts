/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import GameLocation from "../Models/GameLocation";
import { Hitbox } from "../Models/Hitbox";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { getFrameHitbox } from "../Utility/Frame";
import { cloneObject, getNewLocation } from "../Utility/Lib";
import { fallsWithin } from "../Utility/Location";

/**
 * Module:          Particle
 * Responsibility:  Render a single particle.
 */

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
     * Construct the particle.
     */
    constructor(frame: Frame, angle: number, speed: number, acceleration: number, location: GameLocation) {
        super(location);

        this.frame = cloneObject(frame);
        this.angle = angle;
        this.speed = speed;
        this.acceleration = acceleration;
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
        this.location = getNewLocation(this.angle, this.speed, this.location);
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
     * @returns {Hitbox}. The hitbox.
     */
    public getHitbox(): Hitbox {
        return getFrameHitbox(this.location, this.frame);
    }
}
