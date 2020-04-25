/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import GameLocation from "../Models/GameLocation";
import Particle from "../Particles/Particle";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState } from "../State/Store";
import { Frame } from "../Types/Types";
import { convertVariableFrameColor } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          StraightDownBulletProvider
 * Responsibility:  Shoots a bullet straight down
 */

const {
    averagePixelSize
} = dimensionProvider();

export default class BulletProvider {
    private minTimeBetweenShots: number;
    private bulletFrame: Frame;
    private shouldFire: (self: BaseEnemy) => boolean;
    private angle: number;
    private speed: number;

    constructor(
        minTimeBetweenShots: number,
        bulletFrame: Frame,
        bulletColor: string,
        angle: number,
        speed: number,
        shouldfire: (self: BaseEnemy) => boolean) {
        this.minTimeBetweenShots = minTimeBetweenShots;

        this.bulletFrame = cloneObject(bulletFrame);
        this.shouldFire = shouldfire;
        this.angle = angle;
        this.speed = speed;

        convertVariableFrameColor(this.bulletFrame, bulletColor);
    }

    private bulletTick: number = 0;

    public getBullet(tick: number, self: BaseEnemy): Particle | undefined {

        const {
            playerState
        } = appState();

        // Enemies never fire bullets when the player is dead.
        if (playerState.ship === undefined) {
            return undefined;
        }

        // 200 tick timeout between bullets.
        if (tick - this.bulletTick > this.minTimeBetweenShots) {
            this.bulletTick = tick;

            if (this.shouldFire(self)) {
                const location = { ...self.getCenterLocation() };
                location.top = location.top + averagePixelSize * 4;
                location.left = location.left - averagePixelSize;
                const bullet = new Particle(location, this.bulletFrame, this.angle, this.speed, 1);
                return bullet;
            }
        }

        return undefined;
    }
}