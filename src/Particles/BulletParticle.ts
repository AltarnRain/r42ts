/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import { FrameProviderFunction, GameObjectType } from "../Types/Types";
import FrameMutators from "../Utility/FrameMutators";
import Particle from "./Particle";

/**
 * Module:          BulletParticle
 * Responsibility:  A particle identifiable as a bullet.
 */

export default class BulletParticle extends Particle {
    private owner: BaseEnemy;

    constructor(left: number, top: number, owner: BaseEnemy, color: string, getFrame: FrameProviderFunction, angle: number, speed: number) {
        super(left, top, getFrame, angle, speed, 1);

        this.owner = owner;
        FrameMutators.convertVariableFrameColor(this.currentFrameClone, color);
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