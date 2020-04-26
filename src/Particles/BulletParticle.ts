/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import GameLocation from "../Models/GameLocation";
import { Frame, GameObjectType } from "../Types/Types";
import { convertVariableFrameColor } from "../Utility/Frame";
import Particle from "./Particle";

/**
 * Module:          BulletParticle
 * Responsibility:  A particle identifiable as a bullet.
 */

export default class BulletParticle extends Particle {
    private owner: BaseEnemy;

    constructor(owner: BaseEnemy, color: string, startLocation: GameLocation, frame: Frame, angle: number, speed: number) {
        super(startLocation, frame, angle, speed, 1);

        this.owner = owner;
        convertVariableFrameColor(this.currentFrameClone, color);
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