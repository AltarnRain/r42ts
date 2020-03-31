/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import { Explosion } from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import renderFrame from "../Render/RenderFrame";
import GameObjectType from "../Types/GameObject";
import { cloneObject, getNewLocation } from "../Utility/Lib";

/**
 * Module:          Particle
 * Responsibility:  Render a single particle.
 */

export class Particle extends BaseGameObject {

    protected frame: string[][];

    /**
     *
     */
    constructor(frame: string[][], protected angle: number, protected speed: number, protected acceleration: number, protected location: GameLocation) {
        super();

        this.frame = cloneObject(frame);
    }

    /**
     * Returns an explosion asset.
     */
    public getExplosion(): Explosion {
        return undefined;
    }

    /**
     * Returns the object type.
     */
    public getObjectType(): GameObjectType {
        return "particle";
    }

    public draw(_: number): void {

        renderFrame(this.location, this.frame);

        this.location = getNewLocation(this.angle, this.speed, this.location.left, this.location.top);
        this.speed *= this.acceleration;
    }
}
