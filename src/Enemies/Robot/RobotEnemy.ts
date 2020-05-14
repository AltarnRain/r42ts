/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import CGAColors from "../../Constants/CGAColors";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import { ExplosionProviderFunction, OffsetFramesProviderFunction } from "../../Types";
import { getRandomArrayElement } from "../../Utility/Array";
import Mutators from "../../Utility/FrameMutators";
import { Points } from "../../Constants/Constants";

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemny.
 */

const colors = [
    CGAColors.lightBlue,
    CGAColors.lightCyan,
    CGAColors.lightRed,
    CGAColors.lightGreen,
    CGAColors.lightBlue,
    CGAColors.lightMagenta,
    CGAColors.lightCyan,
];

export default class RobotEnemy extends BaseEnemy {
    private color: string;

    constructor(
        frameChangeTime: number,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider,
        getExplosion: ExplosionProviderFunction,
        getFrames: OffsetFramesProviderFunction) {
        super(
            frameChangeTime,
            getFrames,
            getExplosion,
            locationProvider,
            frameProvider);

        this.color = getRandomArrayElement(colors);

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, this.color);
        this.explosion.particleFrames.forEach((pf) => Mutators.Frame.setColor(pf, this.color));
    }

    /**
     * Update the robot state.
     * @param tick
     */
    public updateState(tick: number): void {
        super.updateState(tick);

        this.dispatchCurrentState();
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
        return Points.robot;
    }
}
