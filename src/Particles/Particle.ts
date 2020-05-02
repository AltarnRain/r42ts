/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { GameLocation } from "../Models/GameLocation";
import { GameRectangle } from "../Models/GameRectangle";
import { GameSize } from "../Models/GameSize";
import dimensionProvider from "../Providers/DimensionProvider";
import { FrameProviderFunction, GameObjectType } from "../Types";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { fallsWithin } from "../Utility/Location";

/**
 * Module:          Particle
 * Responsibility:  Render a single particle.
 */

const {
    pixelSize
} = dimensionProvider();

const topOffset = pixelSize / 2 * -1;
const bottomOffset = pixelSize / 2;

export default class Particle extends BaseGameObject {

    /**
     * Dimensions of the particle.
     */
    private dimensions: GameSize;

    /**
     * Construct the object.
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate.
     * @param {FrameProviderFunction} getFrame. Frame for the particle.
     * @param {number} angle. Angle the particle will travel.
     * @param {number} speed. Speed at which the particle will travel.
     * @param {number} acceleration. Acceleration applies each update of the state.
     */
    constructor(locationProvider: ILocationProvider, getFrame: FrameProviderFunction) {
        super(locationProvider);

        this.currentFrame = getFrame();
        this.dimensions = getFrameDimensions(this.currentFrame, pixelSize);
    }

    /**
     * Returns true if the particle is traveling.
     * @returns {boolean}. True if the particle is in the game field.
     */
    public traveling(): boolean {
        const {
            gameFieldTop,
            fullWidth,
            fullHeight,
        } = dimensionProvider();

        const { left, top} = this.locationProvider.getCurrentLocation();

        return fallsWithin(left, top, gameFieldTop, fullHeight, 0, fullWidth);
    }

    /**
     * Returns the particles hitbox.
     * @returns {GameRectangle}. The hitbox.
     */
    public getHitbox(): GameRectangle {
        const { left, top} = this.locationProvider.getCurrentLocation();
        return getFrameHitbox(left, top, this.dimensions.width, this.dimensions.height, topOffset, bottomOffset);
    }

    /**
     * Return the object type.
     * @returns {GameObjectType}. Particle.
     */
    public getObjectType(): GameObjectType {
        return "particle";
    }

    /**
     * Returns the particle location.
     */
    public getLocation(): GameLocation {
        return this.locationProvider.getCurrentLocation();
    }
}
