/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { Particle } from "../Particles/Particle";
import DimensionProvider from "../Providers/DimensionProvider";
import GameObjectType from "../Types/GameObject";

/**
 * Module:          Player bullet
 * Responsibility:  Define the player bullet.
 */

export default class PlayerBullet extends Particle {

    /**
     *
     */
    constructor(protected frame: string[][], protected angle: number, protected speed: number, protected acceleration: number, protected location: GameLocation) {
        super(frame, angle, speed, acceleration, location);

        // Make the player bullet appear from the ship nozzle.
        this.location.left = location.left + DimensionProvider().minPixelSize * 2;
        this.location.top = location.top + DimensionProvider().minPixelSize;
    }

    public getObjectType(): GameObjectType {
        return "playerbullet";
    }

    /**
     * Returns true if the bullet is still moving.
     */
    public inField(): boolean {
        return this.location.top >= DimensionProvider().gameFieldTop;
    }
}