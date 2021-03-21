/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import renderFrame from "../Render/RenderFrame";
import { appState } from "../State/Store";
import Frame from "../Types/Frame";
import { calculateAngle } from "../Utility/Geometry";
import { calculateDistance, getLocation } from "../Utility/Location";

/**
 * Module:          PlayerFormationPart
 * Responsibility:  A particle that travels a distance and then stops being drawn.
 */

export default class PlayerFormationPart {

    /**
     * Current particle location
     */
    private currentLeftLocation: number;

    /**
     * Current top location
     */
    private currentTopLocation: number;

    /**
     * Construct the object.
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate
     * @param {FrameProviderFunction} getFrame. Frame to render for this part.
     * @param {number} speed. Speed at which the part travels.
     * @param {number} leftOffset. Number of pixels to add to the initial left position and the target left position.
     * @param {number} topOffset. Number of pixels to add to the initial top position and the target top position.
     */
    constructor(
        left: number,
        top: number,
        private frame: Frame,
        private speed: number,
        private leftOffset: number,
        private topOffset: number) {

        this.currentLeftLocation = left + leftOffset;
        this.currentTopLocation = top + topOffset;
    }

    /**
     * Update the state of the object.
     */
    public updateState(): void {

        const {
            playerState
        } = appState();

        const targetLeftLocation = playerState.left + this.leftOffset;
        const targetTopLocation = playerState.top + this.topOffset;

        const angle = calculateAngle(this.currentLeftLocation, this.currentTopLocation, targetLeftLocation, targetTopLocation);
        const distance = calculateDistance(this.currentLeftLocation, this.currentTopLocation, targetLeftLocation, targetTopLocation);

        if (distance > appState().speedState.minimumDistance) {
            const nextLocation = getLocation(this.currentLeftLocation, this.currentTopLocation, angle, this.speed);
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
        renderFrame(this.currentLeftLocation, this.currentTopLocation, this.frame);
    }

    /**
     * Returns true if the particle is still traveling to its location.
     * @returns {boolean}. True if the particle is still traveling.
     */
    public traveling(): boolean {
        const {
            playerState
        } = appState();

        const targetLeftLocation = playerState.left + this.leftOffset;
        const targetTopLocation = playerState.top + this.topOffset;

        const distance = calculateDistance(this.currentLeftLocation, this.currentTopLocation, targetLeftLocation, targetTopLocation);
        return distance > appState().speedState.minimumDistance;
    }

    /**
     * Sets the speed of the particle.
     * @param {number} speed. Desired particle speed.
     */
    public setSpeed(speed: number): void {
        this.speed = speed;
    }
}