/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import Particle from "../Particles/Particle";
import { Frame, FrameProviderFunction, GameObjectType } from "../Types/Types";
import { convertFrameColor } from "../Utility/Frame";

/**
 * Module:          Player bullet
 * Responsibility:  Define the player bullet.
 */

export default class PlayerBullet extends Particle {

    /**
     * Construct the object.
     * @param {GameLocation} startLocation. Initial location of the player bullet.
     * @param {Frame} frame. Bullet frame.
     * @param {number} angle. Bullet angle.
     * @param {number} speed. Speed of the bullet.
     * @param {number} acceleration. Acceleration of the bullet.
     */
    constructor(startLocation: GameLocation, getFrame: FrameProviderFunction, angle: number, speed: number) {
        super(startLocation, getFrame, angle, speed, 1);

        convertFrameColor(this.currentFrameClone);
    }

    public getObjectType(): GameObjectType {
        return "playerbullet";
    }
}