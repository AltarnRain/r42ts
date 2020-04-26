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
import { appState } from "../State/Store";

export default class PlayerFormationPart {

    /**
     * Current particle location
     */
    private currentLeftLocation: number;

    private currentTopLocation: number;

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
    constructor(left: number, top: number, getFrame: FrameProviderFunction, speed: number) {

        this.currentFrameClone = getFrame();
        convertFrameColor(this.currentFrameClone);

        this.currentLeftLocation = left;
        this.currentTopLocation = top;

        this.speed = speed;
    }

    /**
     * Update the state of the object.
     */
    public updateState(): void {

        const {
            playerState
        } = appState();

        const targetLeftLocation = playerState.playerLeftLocation;
        const targetTopLocation = playerState.playerTopLocation;

        const angle = calculateAngle(this.currentLeftLocation, this.currentTopLocation, targetLeftLocation, targetTopLocation);
        const distance = calculateDistance(this.currentLeftLocation, this.currentTopLocation, targetLeftLocation, targetTopLocation);

        if (distance > 10) {
            const nextLocation = getLocation(this.currentLeftLocation, this.currentTopLocation, angle, speedProvider(this.speed) > distance ? distance : this.speed);
            this.currentLeftLocation = nextLocation.left;
            this.currentTopLocation = nextLocation.top;
        } else {
            this.currentLeftLocation = targetLeftLocation;
            this.currentTopLocation = targetTopLocation;
        }
    }

    /**
     * Draw the particle.
     */
    public draw(): void {
        renderFrame(this.currentLeftLocation, this.currentTopLocation, this.currentFrameClone);
    }

    /**
     * Returns true if the particle is still traveling to its location.
     * @returns {boolean}. True if the particle is still traveling.
     */
    public traveling(): boolean {
        const {
            playerState
        } = appState();

        const targetLeftLocation = playerState.playerLeftLocation;
        const targetTopLocation = playerState.playerTopLocation;

        const distance = calculateDistance(this.currentLeftLocation, this.currentTopLocation, targetLeftLocation, targetTopLocation);
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