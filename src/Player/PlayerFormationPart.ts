/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          PlayerFormationPart
 * Responsibility:  A particle that travels a distance and then stops being drawn.
 */

import speedProvider from "../Providers/SpeedProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, FrameProviderFunction } from "../Types/Types";
import { convertFrameColor } from "../Utility/Frame";
import { calculateAngle } from "../Utility/Geometry";
import { calculateDistance, getLocation } from "../Utility/Location";

export default class PlayerFormationPart {

    /**
     * Current particle location
     */
    private currentLeftLocation: number;

    private currentTopLocation: number;

    /**
     * Target location. Can be set from the outside if the location where the particle should be heading changes.
     */
    private targetLeftLocation: number;

    private targetTopLocation: number;

    /**
     * Particle speed.
     */

    private speed: number;

    /**
     * The current frame.
     */
    private currentFrameClone: Frame;

    /**
     * Construct the object.
     * @param {GameLocation} sourceLocation. Location where the part begins.
     * @param {GameLocation} targetLocation. Location where the part is heading.
     * @param {Frame} frame. Frame to render for this part.
     * @param {number} speed. Speed at which the part travels.
     */
    constructor(sourceLeftLocation: number, sourceTopLocation: number, targetLeftLocation: number, targetTopLocation: number, getFrame: FrameProviderFunction, speed: number) {

        this.currentFrameClone = getFrame();
        convertFrameColor(this.currentFrameClone);

        this.currentLeftLocation = sourceLeftLocation;
        this.currentTopLocation = sourceTopLocation;
        this.targetLeftLocation = targetLeftLocation;
        this.targetTopLocation = targetTopLocation;

        this.speed = speed;
    }

    /**
     * Update the state of the object.
     */
    public updateState(): void {
        const angle = calculateAngle(this.currentLeftLocation, this.currentTopLocation , this.targetTopLocation, this.targetLeftLocation);
        const distance = calculateDistance(this.currentLeftLocation, this.currentTopLocation, this.targetLeftLocation, this.targetTopLocation);

        if (distance > 10) {
            const nextLocation = getLocation(this.currentLeftLocation, this.currentTopLocation, angle, speedProvider(this.speed) > distance ? distance : this.speed);
            this.currentLeftLocation = nextLocation.left;
            this.currentTopLocation = nextLocation.top;
        } else {
            this.currentLeftLocation = this.targetLeftLocation;
            this.currentTopLocation = this.targetTopLocation;
        }
    }

    /**
     * Draw the particle.
     */
    public draw(): void {
        renderFrame(this.currentLeftLocation, this.currentTopLocation, this.currentFrameClone);
    }

    /**
     * Set the target location form the outside.
     * @param {GameLocation} targetLocation. The target location.
     */
    public setUpdatedTargetLocation(left: number, top: number): void {
        this.targetLeftLocation = left;
        this.targetTopLocation = top;
    }

    /**
     * Returns true if the particle is still traveling to its location.
     * @returns {boolean}. True if the particle is still traveling.
     */
    public traveling(): boolean {
        const distance = calculateDistance(this.currentLeftLocation, this.currentTopLocation, this.targetLeftLocation, this.targetTopLocation);
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