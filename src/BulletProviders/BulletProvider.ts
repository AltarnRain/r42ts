/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import BulletParticle from "../Particles/BulletParticle";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState } from "../State/Store";
import { Frame } from "../Types/Types";
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
    leftOffset: number;
    topOffset: number;
    bulletColor: string;

    constructor(
        minTimeBetweenShots: number,
        bulletFrame: Frame,
        bulletColor: string,
        angle: number,
        speed: number,
        leftOffset: number,
        topOffset: number,
        shouldfire: (self: BaseEnemy) => boolean) {
        this.minTimeBetweenShots = minTimeBetweenShots;

        this.bulletFrame = cloneObject(bulletFrame);
        this.shouldFire = shouldfire;
        this.angle = angle;
        this.speed = speed;
        this.leftOffset = leftOffset * averagePixelSize;
        this.topOffset = topOffset * averagePixelSize;
        this.bulletColor = bulletColor;

    }

    private bulletTick: number = 0;

    public getBullet(tick: number, self: BaseEnemy): BulletParticle | undefined {

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

            // shouldFire is passed into the BulletProvider but we have
            // situations where we need to check if a particular enemy can fire.
            if (this.shouldFire(self)) {
                const location = { ...self.getCenterLocation() };
                location.top = location.top +  this.topOffset;
                location.left = location.left + this.leftOffset;
                const bullet = new BulletParticle(self, this.bulletColor, location, this.bulletFrame, this.angle, this.speed);
                return bullet;
            }
        }

        return undefined;
    }
}