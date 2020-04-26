/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemeny first seen in level 2.
 */

import { getExplosion02 } from "../../Assets/Explosion02";
import getTwoPixelBullet from "../../Assets/twoPXBullet";
import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import CGAColors from "../../Constants/CGAColors";
import GameLocation from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";
import { AngleProviderFunction, Frame } from "../../Types/Types";
import { convertVariableFrameColor } from "../../Utility/Frame";
import getRobotFrames from "./RobotFrames";

const {
    averagePixelSize
} = dimensionProvider();

export default class RobotEnemy extends BaseEnemy {

    /**
     * The bullet frame of the robot.
     */
    private bulletFrame: Frame;

    constructor(location: GameLocation, frameChangeTime: number, color: string, locationProvider: BaseLocationProvider, frameProvider: BaseFrameProvider, angleProvider?: AngleProviderFunction) {
        super(location, frameChangeTime, getRobotFrames, getExplosion02, locationProvider, frameProvider, angleProvider);

        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], color);

        this.bulletFrame = getTwoPixelBullet(CGAColors.lightRed);

        this.onFrameChange();
        this.location = this.getOffsetLocation();
    }

    /**
     * Called when a frame change is required. The robot frames are all colored at initialisation so we can keep this simple.
     */
    protected onFrameChange(): void {
        this.currentFrameClone = this.frameProvider.getNextFrameClone();
    }

    /**
     * Returns the points of the robot enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return 100;
    }
}
