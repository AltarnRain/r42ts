/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion02 from "../../Assets/Explosion02";
import { twoPXBullet } from "../../Assets/twoPXBullet";
import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import CGAColors from "../../Constants/CGAColors";
import GameLocation from "../../Models/GameLocation";
import Particle from "../../Particles/Particle";
import DimensionProvider from "../../Providers/DimensionProvider";
import FrameProvider from "../../Providers/FrameProvider";
import { Frame } from "../../Types/Types";
import { convertVariableFrameColor, convertVariableFramesColor } from "../../Utility/Frame";
import { cloneObject } from "../../Utility/Lib";
import RobotFrames from "./RobotFrames";

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemeny first seen in level 2.
 */

const {
    averagePixelSize
} = DimensionProvider();

export default class RobotEnemy extends BaseEnemyObject {

    /**
     * The bullet frame of the robot.
     */
    private bulletFrame: Frame;

    /**
     * Tick since the last bullet fire.
     */
    private bulletTick: number = 0;

    constructor(location: GameLocation, frameChangeTime: number, color: string, locationProvider: BaseLocationProvider, canFire: (self: BaseEnemyObject) => boolean) {
        super(location, frameChangeTime, RobotFrames, Explosion02, locationProvider, canFire);

        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], color);
        convertVariableFramesColor(this.offSetFrames.frames, color);

        this.frameProvider = new FrameProvider(this.offSetFrames.frames, 0);
        this.currentFrame = this.frameProvider.getFrame();
        this.location = this.getOffsetLocation();

        this.bulletFrame = cloneObject(twoPXBullet);
        convertVariableFrameColor(this.bulletFrame, CGAColors.lightRed);
    }

    /**
     * Returns the points of the robot enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return 100;
    }

    /**
     * Returns the bullet frame.
     * @returns {boolean}.
     */
    protected getBulletParticle(tick: number): Particle | undefined {

        // 200 tick timeout between bullets.
        if (tick - this.bulletTick > 200) {
            this.bulletTick = tick;
            // 50% change to fire.
            const rnd = Math.floor(Math.random() * 2);
            if (rnd === 1) {
                const location = { ...this.getCenterLocation() };
                location.top = location.top + averagePixelSize * 4;
                location.left = location.left - averagePixelSize;
                const bullet = new Particle(this.bulletFrame, 90, 5, 1, location);
                return bullet;
            }
        }

        return undefined;
    }
}
