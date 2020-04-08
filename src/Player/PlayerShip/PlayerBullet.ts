/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../../Models/GameLocation";
import Particle from "../../Particles/Particle";
import { Frame, GameObjectType } from "../../Types/Types";
import { convertFrameColor } from "../../Utility/Frame";

/**
 * Module:          Player bullet
 * Responsibility:  Define the player bullet.
 */

export default class PlayerBullet extends Particle {

    /**
     * Construct the object.
     */
    constructor(frame: Frame, angle: number, speed: number, acceleration: number, location: GameLocation) {
        super(frame, angle, speed, acceleration, location);

        convertFrameColor(this.frame);
    }

    public getObjectType(): GameObjectType {
        return "playerbullet";
    }
}