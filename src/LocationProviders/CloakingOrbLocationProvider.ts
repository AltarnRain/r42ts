/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import IGetCurrentIndex from "../Interfaces/IGetCurrentFrame";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getRandomLocation } from "../Utility/Location";
import { Locations } from "../Constants/Constants";

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
    constructor(
        private left: number,
        private top: number,
        private indexProvider: IGetCurrentIndex) {
    }

    /**
     * Increase the speed of the enemy.
     * @param {number} factor. Speed increase factor.
     */
    public increaseSpeed(factor: number): void {
        // Does not work here.
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
        if (this.indexProvider.getCurrentIndex() === 4) {
            const { left, top } = getRandomLocation(right, outerLeft, Locations.CloakingOrb.maxBottom, gameField.top);
            this.left = left;
            this.top = top;
        }
    }
}