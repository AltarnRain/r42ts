/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import ILocationProvider from "../../Base/ILocationProvider";
import { ExplosionProviderFunction, FireAngleProviderFunction, OffsetFramesProviderFunction } from "../../Types";
import Mutators from "../../Utility/FrameMutators";

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemeny first seen in level 2.
 */

export default class RobotEnemy extends BaseEnemy {

    private color: string;

    constructor(
        color: string,
        frameChangeTime: number,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider,
        getExplosion: ExplosionProviderFunction,
        getFrames: OffsetFramesProviderFunction,
        angleProvider?: FireAngleProviderFunction) {
        super(
            frameChangeTime,
            getFrames,
            getExplosion,
            locationProvider,
            frameProvider,
            angleProvider);

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, color);
        Mutators.Frame.setColor(this.explosion.particleFrames[0], color);

        this.color = color;

        this.onFrameChange();
    }

    /**
     * Called when a frame change is required. The robot frames are all colored at initialisation so we can keep this simple.
     */
    protected onFrameChange(): void {
        const nextFrame = this.frameProvider.getNextFrame();
        Mutators.Frame.setColor(nextFrame, this.color);
        this.currentFrame = nextFrame;
    }

    /**
     * Returns the points of the robot enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return 100;
    }
}
