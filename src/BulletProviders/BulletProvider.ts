/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import BulletParticle from "../Particles/BulletParticle";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState } from "../State/Store";
import { Frame, AngleProviderFunction, FireCheckFunction } from "../Types/Types";
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
    private shouldFire: FireCheckFunction;
    private speed: number;
    private leftOffset: number;
    private topOffset: number;
    private bulletColor: string;
    private angleProvider: AngleProviderFunction;

    constructor(
        minTimeBetweenShots: number,
        bulletFrame: Frame,
        bulletColor: string,
        speed: number,
        leftOffset: number,
        topOffset: number,
        shouldfire: (self: BaseEnemy) => boolean,
        angleProvider: AngleProviderFunction) {
        this.minTimeBetweenShots = minTimeBetweenShots;

        this.bulletFrame = cloneObject(bulletFrame);
        this.shouldFire = shouldfire;
        this.speed = speed;
        this.leftOffset = leftOffset * averagePixelSize;
        this.topOffset = topOffset * averagePixelSize;
        this.bulletColor = bulletColor;
        this.angleProvider = angleProvider;
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

                const angle = this.angleProvider(self);

                const bullet = new BulletParticle(self, this.bulletColor, location, this.bulletFrame, angle, this.speed);
                return bullet;
            }
        }

        return undefined;
    }
}