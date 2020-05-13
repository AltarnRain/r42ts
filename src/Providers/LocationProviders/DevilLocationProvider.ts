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
} = dimensionProvider();

export default class DevilLocationProvider implements ILocationProvider {
    private bottomLimit: number;
    private topLimit: number;
    private left: number;
    private top: number;
    private speed: number;
    private angles: number[];
    private width: number;
    private height: number;
    private baseSpeed: number;
    private angle: number;

    constructor(
        left: number,
        top: number,
        speed: number,
        movementAngles: number[],
        width: number,
        height: number,
        topLimit: number,
        bottomLimit: number) {

        this.left = left;
        this.top = top;
        this.speed = speed;
        this.baseSpeed = speed;
        this.angles = movementAngles;
        this.width = width;
        this.height = height;
        this.angle = getRandomArrayElement(movementAngles);
        this.topLimit = topLimit;
        this.bottomLimit = bottomLimit;
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

        let left = this.left;
        let top = this.top;
        let angle = this.angle;

        if (Guard.isPlayerAlive(playerState)) {
            const { hitboxes: { bottom: playerBottomHixbox } } = playerState;

            // When the player moves underneath this enemy it moves down.
            if (this.left > playerBottomHixbox.left && this.left - this.width < playerBottomHixbox.right) {
                this.angle = angles.down;
            } else if (this.top > this.topLimit) {
                this.angle = getRandomArrayElement(this.angles);
            } else {
                const nextLocationAndangle = getNextLocationAndAngle(
                    this.left,
                    this.top,
                    this.angle,
                    this.speed,
                    this.width,
                    this.height,
                    this.topLimit,
                    this.bottomLimit
                );

                left = nextLocationAndangle.location.left;
                top = nextLocationAndangle.location.top;
                angle = nextLocationAndangle.angle;
            }

            this.left = left;
            this.top = top;
            this.angle = angle;
        }
    }
}