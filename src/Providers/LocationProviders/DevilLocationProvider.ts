/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../../Constants/Angles";
import Guard from "../../Guard";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import { GameLocation } from "../../Models/GameLocation";
import { appState } from "../../State/Store";
import { getRandomArrayElement } from "../../Utility/Array";
import { getNextLocationAndAngle } from "../../Utility/Location";
import dimensionProvider from "../DimensionProvider";

/**
 * Module:          DevilLocationProvider
 * Responsibility:  Location provider for the devil enemy.
 *                  This enemy moves in diagonal lines but moves down when it can fire. Then, it moves up. Also
 *                  It picks a random angle when it hits the top screen.
 */

const {
    gameField,
    pixelSize
} = dimensionProvider();

export default class DevilLocationProvider implements ILocationProvider {
    private bottomLimit: number;
    private topLimit: number;
    private left: number;
    private top: number;
    private speed: number;
    private allAngles: number[];
    private width: number;
    private height: number;
    private baseSpeed: number;
    private angle: number;
    private sideAngles: number[];

    private attacking: boolean;
    private recovering: boolean;

    constructor(
        left: number,
        top: number,
        speed: number,
        allAngles: number[],
        sideAngles: number[],
        width: number,
        height: number,
        topLimit: number,
        bottomLimit: number) {

        this.left = left;
        this.top = top;
        this.speed = speed;
        this.baseSpeed = speed;
        this.allAngles = allAngles;
        this.sideAngles = sideAngles;
        this.width = width;
        this.height = height;
        this.angle = getRandomArrayElement(allAngles);
        this.topLimit = topLimit;
        this.bottomLimit = bottomLimit;

        this.attacking = false;
        this.recovering = false;
    }

    /**
     * Returns the current location
     * @returns {GameLocation}. The location.
     */
    public getCurrentLocation(): GameLocation {
        return { left: this.left, top: this.top };
    }

    /**
     * Increases movement speed.
     * @param {number} factor. Factor.
     */

    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed * factor;
    }

    /**
     * Updates the state
     * @param {number} tick. Current tick
     */
    public updateState(tick: number): void {

        const {
            playerState
        } = appState();

        if (Guard.isPlayerAlive(playerState)) {
            const { hitboxes: { bottom: playerBottomHixbox } } = playerState;

            // When the player moves underneath this enemy it moves down to attcck except when it is going up after an attack or if it is still attacking.
            if (this.left > playerBottomHixbox.left &&
                this.left - this.width < playerBottomHixbox.right &&
                this.recovering === false && this.attacking === false) {
                this.angle = angles.down;
                this.attacking = true;
            } else if (this.top <= this.topLimit + this.height / 2 && this.recovering) {

                // The enemy finished moving up so it's recovered from an attack.
                this.recovering = false;
                this.angle = getRandomArrayElement(this.sideAngles);

            } else if (this.top + this.height * 2 >= this.bottomLimit && this.attacking) {
                // The enemy has hit the bottom limit while doing an attack, now it must recover.
                this.recovering = true;

                // Attack done. Time  to recover.
                this.attacking = false;

            }

            const { location: { left, top }, angle } = getNextLocationAndAngle(
                this.left,
                this.top,
                this.angle,
                this.speed,
                this.width,
                this.height,
                this.topLimit,
                this.bottomLimit
            );

            this.left = left;
            this.top = top;
            this.angle = angle;
        }
    }
}