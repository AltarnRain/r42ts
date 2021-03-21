/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../Interfaces/ILocationProvider";
import GameLocation from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import Angle from "../Types/Angle";
import { getRandomArrayElement } from "../Utility/Array";
import { getLeftOrRightFromAngle } from "../Utility/Geometry";
import { randomNumberInRange } from "../Utility/Lib";
import { getLocation } from "../Utility/Location";

/**
 * Module:          RandomReapperance
 * Responsibility:  Provides movement for asteroids and space monsters. The enenmies pop-up all over the place.
 */

const {
    gameField
} = dimensionProvider();

export default class RandomReapperance implements ILocationProvider {
    /**
     * Current top.
     */
    private top: number;

    /**
     * Current bottom.
     */
    private left: number;

    /**
     * Current angle.
     */
    private angle: Angle;

    /**
     * Current speed.
     */
    private speed: number;

    /**
     * Maximum bottom position.
     */
    private maxBottom: number;

    /**
     * Initial top position.
     */
    private startTop: number;

    constructor(
        private width: number,
        private height: number,
        private angles: Angle[],
        private speeds: () => number[]) {

        const doubleHeight = this.height * 2;
        this.top = gameField.top - doubleHeight;
        this.left = this.getRandomLeft();
        this.angle = getRandomArrayElement(angles);
        this.speed = getRandomArrayElement(speeds());

        this.maxBottom = gameField.bottom + doubleHeight;
        this.startTop = gameField.top - doubleHeight;
    }

    /**
     * Returns the current location
     * @returns {GameLocation}. Current location.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top,
        };
    }

    /**
     * Updates the state of the location provider.
     * @param {number} tick. Current game tick
     */
    public updateState(tick: number): void {
        const nextLocation = getLocation(this.left, this.top, this.angle, this.speed);

        this.left = nextLocation.left;
        this.top = nextLocation.top;

        if (this.top > this.maxBottom) {
            // Reduce top by 2x height for a nice and smooth reapperance of the asteroid
            this.left = this.getRandomLeft();
            this.angle = getRandomArrayElement(this.angles);
            this.speed = getRandomArrayElement(this.speeds());

            const direction = getLeftOrRightFromAngle(this.angle);

            if (direction === "left") {
                this.left = gameField.right;
                this.top = randomNumberInRange(gameField.bottom / 2, gameField.top);
            } else if (direction === "right") {
                this.left = gameField.left;
                this.top = randomNumberInRange(gameField.bottom / 2, gameField.top);
            } else {
                this.top = this.startTop;
            }
        }
    }

    /**
     * Returns a random number between the left and right of the game field compensating for the object width
     * @returns {number}. Random nummber.
     */
    private getRandomLeft(): number {
        return randomNumberInRange(gameField.right - this.width, this.width);
    }

    /**
     * Not implemented.
     */
    public increaseSpeed(factor: number): void {
        // Does nothing.
    }
}