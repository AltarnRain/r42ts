/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import ILocationProvider from "../Interfaces/ILocationProvider";
import { FrameProviderFunction, GameObjectType } from "../Types";
import Mutators from "../Utility/FrameMutators";
import Particle from "./Particle";

/**
 * Module:          BulletParticle
 * Responsibility:  A particle identifiable as a bullet.
 */

export default class BulletParticle extends Particle {
    private owner: BaseEnemy;

    constructor(locationProvider: ILocationProvider, owner: BaseEnemy, color: string, getFrame: FrameProviderFunction) {
        super(locationProvider, getFrame);

        this.owner = owner;
        Mutators.Frame.setColor(this.currentFrame, color);
    }

    /**
     * Checks if the passed enemy is the owner of the bullet.
     * @param {BaseEnemy} enemy. Any enemy.
     * @returns {boolean}. True if the passed enemy is the owner of the bullet.
     */
    public isOwner(enemy: BaseEnemy): boolean {
        const result = enemy === this.owner;
        return result;
    }

    public getObjectType(): GameObjectType {
        return "enemybullet";
    }
}