/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemeny first seen in level 2.
 */

import Explosion02 from "../../Assets/Explosion02";
import { twoPXBullet } from "../../Assets/twoPXBullet";
import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import BulletRunner from "../../BulletProviders/BulletRunner";
import CGAColors from "../../Constants/CGAColors";
import GameLocation from "../../Models/GameLocation";
import BackAndForthFrameProvider from "../../Providers/BackAndForthFrameProvider";
import dimensionProvider from "../../Providers/DimensionProvider";
import { Frame, AngleProviderFunction } from "../../Types/Types";
import { convertVariableFrameColor, convertVariableFramesColor } from "../../Utility/Frame";
import { cloneObject } from "../../Utility/Lib";
import robotFrames from "./RobotFrames";
import BaseFrameProvider from "../../Base/BaseFrameProvider";

const {
    averagePixelSize
} = dimensionProvider();

export default class RobotEnemy extends BaseEnemy {

    /**
     * The bullet frame of the robot.
     */
    private bulletFrame: Frame;

    constructor(location: GameLocation, frameChangeTime: number, color: string, locationProvider: BaseLocationProvider, frameProvider: BaseFrameProvider, angleProvider?: AngleProviderFunction) {
        super(location, frameChangeTime, robotFrames, Explosion02, locationProvider, frameProvider, angleProvider);

        convertVariableFrameColor(this.explosionClone.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosionClone.particleFrames[0], color);
        convertVariableFramesColor(this.offSetFramesClone.frames, color);

        this.bulletFrame = cloneObject(twoPXBullet);
        convertVariableFrameColor(this.bulletFrame, CGAColors.lightRed);

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
