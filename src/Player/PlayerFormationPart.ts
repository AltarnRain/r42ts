/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import renderFrame from "../Render/RenderFrame";
import { Frame } from "../Types/Types";
import { convertFrameColor } from "../Utility/Frame";
import { calculateAngle } from "../Utility/Geometry";
import { cloneObject } from "../Utility/Lib";
import { calculateDistance, getLocation } from "../Utility/Location";

/**
 * Module:          DestinationParticle
 * Responsibility:  A particle that travels a distance and then stops being drawn.
 */

export default class PlayerFormationPart {

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
     * The current frame.
     */
    private currentFrame: Frame;

    /**
     * Construct the distance particle.
     */
    constructor(sourceLocation: GameLocation, targetLocation: GameLocation, frame: Frame, speed: number) {

        this.currentFrame = cloneObject(frame);
        convertFrameColor(this.currentFrame);

        this.currentLocation = { ...sourceLocation };
        this.targetLocation = { ...targetLocation };
        this.speed = speed;

        this.updateState = this.updateState.bind(this);
        this.draw = this.draw.bind(this);
    }

    /**
     * Update the state of the object.
     */
    public updateState(): void {
        const angle = calculateAngle(this.currentLocation, this.targetLocation);
        const distance = calculateDistance(this.currentLocation, this.targetLocation);

        if (distance > 10) {
            this.currentLocation = getLocation(this.currentLocation, angle, this.speed > distance ? distance : this.speed);
        } else {
            this.currentLocation = {...this.targetLocation};
        }
    }

    /**
     * Draw the particle.
     */
    public draw(): void {
        renderFrame(this.currentLocation, this.currentFrame);
    }

    /**
     * Set the target location form the outside.
     * @param {GameLocation} targetLocation. The target location.
     */
    public setUpdatedTargetLocation(targetLocation: GameLocation): void {
        this.targetLocation = { ...targetLocation };
    }

    /**
     * Returns true if the particle is still traveling to its location.
     * @returns {boolean}. True if the particle is still traveling.
     */
    public traveling(): boolean {
        const distance = calculateDistance(this.currentLocation, this.targetLocation);
        return distance > 5;
    }

    /**
     * Sets the speed of the particle.
     * @param {number} speed. Desired particle speed.
     */
    public setSpeed(speed: number): void {
        this.speed = speed;
    }
}