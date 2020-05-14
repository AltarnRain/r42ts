/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../../Interfaces/ILocationProvider";
import { GameLocation } from "../../Models/GameLocation";
import { Angle } from "../../Types";
import { getRandomArrayElement } from "../../Utility/Array";
import { randomNumberInRange } from "../../Utility/Lib";
import { getLocation } from "../../Utility/Location";
import dimensionProvider from "../DimensionProvider";

/**
 * Module:          AsteroidLocationProvider
 * Responsibility:  Provides movement for asteroids.
 */

const {
    gameField
} = dimensionProvider();

export default class AsteroidLocationProvider implements ILocationProvider {
    private width: number;
    private height: number;
    private angles: any[];
    private top: number;
    private left: number;
    private angle: Angle;
    private speeds: number[];
    private speed: number;
    private maxBottom: number;
    private startTop: number;

    constructor(width: number, height: number, angles: Angle[], speeds: number[]) {
        this.width = width;
        this.height = height;
        this.angles = angles;
        this.speeds = speeds;

        const doubleHeight =  this.height * 2;
        this.top = gameField.top - doubleHeight;
        this.left = this.getRandomLeft();
        this.angle = getRandomArrayElement(angles);
        this.speed =  getRandomArrayElement(speeds);

        this.maxBottom = gameField.bottom + doubleHeight;
        this.startTop = gameField.top - doubleHeight;
    }

    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top,
        };
    }

    public updateState(tick: number): void {
        const nextLocation = getLocation(this.left, this.top, this.angle, this.speed);

        this.left = nextLocation.left;
        this.top = nextLocation.top;

        if (this.top > this.maxBottom) {
            // Reduce top by 2x height for a nice and smooth reapperance of the asteroid
            this.top = this.startTop;
            this.left = this.getRandomLeft();
            this.angle = getRandomArrayElement(this.angles);
            this.speed = getRandomArrayElement(this.speeds);
        }
    }

    public increaseSpeed(factor: number): void {
        // Does nothing.
    }

    private getRandomLeft(): number {
        return randomNumberInRange(gameField.right - this.width, this.width);
    }
}