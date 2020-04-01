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
import { GameObjectType } from "../Types/Types";
import { cloneObject, getFrameLocations, getNewLocation } from "../Utility/Lib";

/**
 * Module:          Particle
 * Responsibility:  Render a single particle.
 */

export default class Particle extends BaseGameObject {

    /**
     * Frame of the particle.
     */
    protected frame: string[][];

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
    constructor(frame: string[][], angle: number, speed: number, acceleration: number, location: GameLocation) {
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
            fullHeight,
            fullWidth,
        } = DimensionProvider();

        const yBounds = this.location.top < gameFieldTop || this.location.top > fullHeight;
        const xBounds = this.location.left < 0 || this.location.left > fullWidth;

        return xBounds || yBounds;
    }

    /**
     * Returns the locations occupied by the bullet.
     */
    public getLocations(): GameLocation[] {
        return getFrameLocations(this.frame, this.location);
    }
}
