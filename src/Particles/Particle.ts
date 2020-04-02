/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { getFrameLocations } from "../Utility/Frame";
import { cloneObject, getNewLocation, fallsWithin } from "../Utility/Lib";

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
        super();

        this.location = { ...location };

        this.frame = cloneObject(frame);
        this.angle = angle;
        this.speed = speed;
        this.acceleration = acceleration;
    }

    /**
     * Returns an explosion asset.
     */
    public getExplosion(): Explosion {
        return undefined;
    }

    /**
     * Returns the object type.
     */
    public getObjectType(): GameObjectType {
        return "particle";
    }

    public draw(_: number): void {
        renderFrame(this.location, this.frame);
        this.location = getNewLocation(this.angle, this.speed, this.location.left, this.location.top);
        this.speed *= this.acceleration;
    }

    /**
     * Returns true if the particle is still in the game field.
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
     * Returns the locations occupied by the bullet.
     */
    public getLocations(): GameLocation[] {
        return getFrameLocations(this.frame, this.location);
    }
}
