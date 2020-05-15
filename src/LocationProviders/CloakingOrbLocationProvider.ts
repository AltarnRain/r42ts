/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations, FrameTimes } from "../Constants/Constants";
import IGetCurrentIndex from "../Interfaces/IGetCurrentFrame";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getRandomLocation } from "../Utility/Location";

/**
 * Module:          CloakingOrbLocationProvider
 * Responsibility:  Location provider for the Cloaking orb enemy. This enemy disappears and reappears at a random location.
 */

const {
    gameField,
    pixelSize
} = dimensionProvider();

const outerLeft = gameField.left;
const right = gameField.right - pixelSize * 3;

export default class CloakingOrbLocationProvider implements ILocationProvider {

    /**
     * Handle for a window.setTimeout that resets the canChangeLocation flag when the time is up.
     */
    private canChangeLocationResetHandle: number | undefined = undefined;

    /**
     * When true the enemy is permitted to change its location.
     */
    private canChangeLocation: boolean = true;

    constructor(
        private left: number,
        private top: number,
        private maxIndex: number,
        private indexProvider: IGetCurrentIndex) {
    }

    /**
     * Increase the speed of the enemy.
     * @param {number} factor. Speed increase factor.
     */
    public increaseSpeed(factor: number): void {
        // Not used here.
    }

    /**
     * Returns the current location.
     * @returns {GameLocation}. Current game location.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top,
        };
    }

    /**
     * Update the state of the location provider.
     * @param {number} tick. Current game tick.
     */
    public updateState(tick: number): void {
        if (this.indexProvider.getCurrentIndex() === this.maxIndex && this.canChangeLocation) {
            this.canChangeLocation = false;
            const { left, top } = getRandomLocation(right, outerLeft, Locations.CloakingOrb.maxBottom, gameField.top);
            this.left = left;
            this.top = top;
        }

        // If there is no window.setTimeout running and the enemy cannot change its location then we
        // Set up a timer to reset the canChangeLocation flag.
        if (this.canChangeLocationResetHandle === undefined && this.canChangeLocation === false) {

            // Set a timer. We'll use the FrameTimes.cloacking orbs * 2 to ensure we don't reset the flag while
            // the max frame is still in use. This cannot but coincide.
            this.canChangeLocationResetHandle = window.setTimeout(() => {

                // Ok, waiting's over the enemy can change location the next time its last frame is rendered.
                // This is when the cloaking orb is completely invisible.
                this.canChangeLocation = true;

                // Reset the handle so another reset can be queued again.
                this.canChangeLocationResetHandle = undefined;
            }, FrameTimes.cloakingOrb * 2);
        }
    }
}