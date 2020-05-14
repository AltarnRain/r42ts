/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Wobble
 * Responsibility:  A location provider that makes an enemy wobble. This is done by constantly picking a random angle
 */

import BaseLocationProvider from "../Base/BaseLocationProvider";
import { getAngles } from "../Constants/Angles";
import dimensionProvider from "../Providers/DimensionProvider";
import { getRandomArrayElement } from "../Utility/Array";
import { getLocation } from "../Utility/Location";

const {
    gameField
} = dimensionProvider();

export default class Wobble extends BaseLocationProvider {

    /**
     * Time between switching angles.
     */
    private angleSwitchTimeout: number;

    /**
     * Last tick an angle was changed.
     */
    private lastTick: number = 0;

    /**
     * Angles to pick from.
     */
    private angles: number[];

    constructor(
        left: number,
        top: number,
        speed: number,
        angle: number,
        width: number,
        height: number,
        angleSwitchTimeout: number) {
        super(left,
            top,
            speed,
            angle,
            width,
            height);

        this.angleSwitchTimeout = angleSwitchTimeout;

        this.angles = getAngles();
    }

    /**
     * Update the state of the location provider.
     * @param {number} tick. Current game tick.
     */
    public updateState(tick: number): void {

        if (tick > this.angleSwitchTimeout + this.lastTick) {
            this.angle = getRandomArrayElement(this.angles);
            this.lastTick = tick;
        }

        const newLocation = getLocation(this.left, this.top, this.angle, this.speed);

        if (newLocation.left <= gameField.left || newLocation.left + this.width >= gameField.right) {
            this.angle = 180 - this.angle;
        }

        if (newLocation.top <= gameField.top) {
            this.angle *= -1;
        }

        // When a wobbling enemy gets stuck on the bottom, their position is roughtly set to 2/3 of the gamefield
        if (newLocation.top >= gameField.bottom - this.height * 1.5) {
            this.top = gameField.top * (2 / 3);
        }

        const nextLocation = getLocation(this.left, this.top, this.angle, this.speed);
        this.left = nextLocation.left;
        this.top = nextLocation.top;
    }
}