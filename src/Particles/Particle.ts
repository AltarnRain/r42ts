/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { getNewLocation } from "../Utility/Lib";
import { Explosion } from "../Models/Explosion";
import GameObjectType from "../Types/GameObject";

/**
 * Module:          Particle
 * Responsibility:  Render a single particle.
 */

export class Particle extends BaseGameObject {
    /**
     *
     */
    constructor(private frame: string[][], private angle: number, private speed: number, private acceleration: number, protected location: GameLocation) {
        super();
    }

    public getExplosion(): Explosion {
        return undefined;
    }
    public getObjectType(): GameObjectType {
        return "particle";
    }

    public draw(_: number): void {
        renderFrame(this.location, this.frame);

        this.location = getNewLocation(this.angle, this.speed, this.location.left, this.location.top);
        this.speed *= this.acceleration;
    }
}
