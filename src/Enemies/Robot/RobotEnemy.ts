/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemeny first seen in level 2.
 */

import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import dimensionProvider from "../../Providers/DimensionProvider";
import { getExplosion02 } from "../../SharedFrames/Explosion02";
import { FireAngleProviderFunction } from "../../Types/Types";
import { convertVariableFrameColor, setFrameColor } from "../../Utility/Frame";
import getRobotFrames from "./RobotFrames";

const {
    averagePixelSize
} = dimensionProvider();

export default class RobotEnemy extends BaseEnemy {

    private color: string;

    constructor(left: number, top: number, frameChangeTime: number, color: string, locationProvider: BaseLocationProvider, frameProvider: BaseFrameProvider, angleProvider?: FireAngleProviderFunction) {
        super(left, top, frameChangeTime, getRobotFrames, getExplosion02, locationProvider, frameProvider, angleProvider);

        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], color);

        this.color = color;
    }

    /**
     * Called when a frame change is required. The robot frames are all colored at initialisation so we can keep this simple.
     */
    protected onFrameChange(): void {
        const nextFrame = this.frameProvider.getNextFrameClone();
        setFrameColor(nextFrame, this.color);
        this.currentFrameClone = nextFrame;
    }

    /**
     * Returns the points of the robot enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return 100;
    }
}
