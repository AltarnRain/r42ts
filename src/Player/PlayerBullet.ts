/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { Hitbox } from "../Models/Hitbox";
import Particle from "../Particles/Particle";
import DimensionProvider from "../Providers/DimensionProvider";
import { Frame, GameObjectType } from "../Types/Types";
import { convertFrameColor, getFrameHitbox } from "../Utility/Frame";

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

        // Make the player bullet appear from the ship nozzle.
        this.location.left = location.left + DimensionProvider().minPixelSize * 2;
        this.location.top = location.top - DimensionProvider().minPixelSize * 2;

        convertFrameColor(this.frame);
    }

    public getObjectType(): GameObjectType {
        return "playerbullet";
    }

    /**
     * Returns the player bullets hitbox.
     */
    public getHitbox(): Hitbox {
        return getFrameHitbox(this.location, this.frame, DimensionProvider().maxPixelSize);
    }
}