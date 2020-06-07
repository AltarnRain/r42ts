/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import Guard from "../Guard";
import ILocationDirectionProvider from "../Interfaces/ILocationDirectionProvider";
import GameLocation from "../Models/GameLocation";
import { appState } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { getLeftOrRightFromAngle, getUpOrDownFromAngle } from "../Utility/Geometry";
import { getLocation, getNextLocationAndAngle } from "../Utility/Location";

/**
 * Module:          AttackerLocationProvider
 * Responsibility:  Location provider for an enemy that moves down to attack.
 *                  This enemy moves in diagonal lines but moves down when it can fire. Then, it moves up. Also
 *                  It picks a random angle when it hits the top screen.
 */

export default class AttackerLocationProvider implements ILocationDirectionProvider {

    /**
     * Base speed. Set to the inital speed. Used to calculate speed increase.
     */
    private baseSpeed: () => number;

    /**
     * Current angle of the devil.
     */
    private angle: number;

    /**
     * When true the devil is moving down for an attack.
     */
    private attacking: boolean;

    /**
     * When true the devil has moved as far down as it can and is moving up again.
     */
    private recovering: boolean;
    speed: number;

    /**
     * Construct the object.
     * @param {number} left. Initial left.
     * @param {number} top. Initial top.
     * @param {number} speed. Initial speed.
     * @param {number[]} sideAngles. Angles the devil will use to go left or right when it reaches it maximum top position.
     * @param {number} width. Width of the enemy.
     * @param {number} height. Height of the enemy.
     * @param {number} topLimit. Maximum top. Used to reset recovery or to bounce with a new angle.
     * @param {number} bottomLimit. Maximum bottom. User to reset attack or to bounce with a new angle.
     */
    constructor(
        private left: number,
        private top: number,

        speed: () => number,
        private sideAngles: number[],
        private width: number,
        private height: number,
        private topLimit: number,
        private bottomLimit: number) {

        this.baseSpeed = speed;

        this.speed = speed();

        this.angle = getRandomArrayElement(sideAngles);
        this.attacking = false;
        this.recovering = false;
    }

    /**
     * Returns true if the enemy is attacking or recovering. Used to determine if the enemy should
     * @returns {boolean}.
     */
    public isAttacking(): boolean {
        return this.attacking || this.recovering;
    }

    /**
     * Returns the direction the enemy is heading. User to show the moving left or right frame.
     * @returns {"left" | "right" | undefined}. Can be undefined. An straight up or down angle is not going left or right.
     */
    public getDirection(): "left" | "right" | "up" | "down" | undefined {
        let direction: "left" | "right" | "up" | "down" | undefined = getLeftOrRightFromAngle(this.angle);

        if (direction === undefined) {
            direction = getUpOrDownFromAngle(this.angle);
        }

        return direction;
    }

    /**
     * Returns the current location
     * @returns {GameLocation}. The location.
     */
    public getCurrentLocation(): GameLocation {
        return {
            left: this.left,
            top: this.top
        };
    }

    /**
     * Increases movement speed.
     * @param {number} factor. Factor.
     */

    public increaseSpeed(factor: number): void {
        this.speed = this.baseSpeed() * factor;
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
                this.left < playerBottomHixbox.right &&
                this.recovering === false && this.attacking === false) {
                this.angle = angles.down;
                this.attacking = true;

            } else if (this.top - this.height <= this.topLimit && this.recovering) {

                // The enemy finished moving up so it's recovered from an attack.
                this.recovering = false;
                this.angle = getRandomArrayElement(this.sideAngles);

            } else if (this.top >= this.bottomLimit && this.attacking) {
                // The enemy has hit the bottom limit while doing an attack, now it must recover.
                this.recovering = true;

                // Attack done. Time  to recover.
                this.attacking = false;
                this.angle = angles.up;
            }
        }

        // Regular movement.
        if (!this.attacking && !this.recovering) {
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
        } else {
            // On the attack or on recovert.
            const { left, top } = getLocation(this.left, this.top, this.angle, this.speed);
            this.left = left;
            this.top = top;
        }
    }
}