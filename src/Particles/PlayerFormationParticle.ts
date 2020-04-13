/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseParticle from "../Base/BaseParticle";
import GameLocation from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import renderFrame from "../Render/RenderFrame";
import { Frame, GameObjectType } from "../Types/Types";
import { convertFrameColor } from "../Utility/Frame";
import { calculateVector } from "../Utility/Geometry";
import { cloneObject } from "../Utility/Lib";
import { calculateDistance, getNewLocation } from "../Utility/Location";

/**
 * Module:          DestinationParticle
 * Responsibility:  A particle that travels a distance and then stops being drawn.
 */

export default class PlayerFormationParticle extends BaseParticle {

    /**
     * Current particle location
     */
    private currentLocation: GameLocation;

    /**
     * Target location. Can be set from the outside if the location where the particle should be heading changes.
     */
    private targetLocation: GameLocation;

    /**
     * Particle speed.
     */

    private speed: number;

    /**
     * Construct the distance particle.
     */
    constructor(sourceLocation: GameLocation, targetLocation: GameLocation, frame: Frame, speed: number) {
        super();

        this.currentFrame = cloneObject(frame);
        convertFrameColor(this.currentFrame);

        this.currentLocation = { ...sourceLocation };
        this.targetLocation = { ...targetLocation };
        this.speed = speed;
    }

    /**
     * Update the state of the object.
     */
    public updateState(_: number): void {
        const angle = calculateVector(this.currentLocation, this.targetLocation);
        this.currentLocation = getNewLocation(this.currentLocation, angle, this.speed);

    }

    /**
     * Draw the particle.
     */
    public draw(): void {
        renderFrame(this.currentLocation, this.currentFrame);
    }

    /**
     * Returns the object type.
     */
    public getObjectType(): GameObjectType {
        return "particle";
    }

    /**
     * Set the target location form the outside.
     * @param {GameLocation} targetLocation. The target location.
     */
    public setUpdatedTargetLocation(targetLocation: GameLocation): void {
        this.targetLocation = { ...targetLocation };
    }

    public getHitbox(): GameRectangle {
        return {
            left: 0,
            bottom: 0,
            right: 0,
            top: 0,
        };
    }

    /**
     * Returns true if the particle is still traveling to its location.
     * @returns {boolean}. True if the particle is still traveling.
     */
    public traveling(): boolean {
        const distance = calculateDistance(this.currentLocation, this.targetLocation);
        return distance > 20;
    }

    /**
     * Sets the speed of the particle.
     * @param {number} speed. Desired particle speed.
     */
    public setSpeed(speed: number): void {
        this.speed = speed;
    }
}