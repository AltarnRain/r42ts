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
import BulletProvider from "../../BulletProviders/BulletProvider";
import CGAColors from "../../Constants/CGAColors";
import GameLocation from "../../Models/GameLocation";
import BackAndForthFrameProvider from "../../Providers/BackAndForthFrameProvider";
import dimensionProvider from "../../Providers/DimensionProvider";
import { Frame } from "../../Types/Types";
import { convertVariableFrameColor, convertVariableFramesColor } from "../../Utility/Frame";
import { cloneObject } from "../../Utility/Lib";
import robotFrames from "./RobotFrames";

const {
    averagePixelSize
} = dimensionProvider();

export default class RobotEnemy extends BaseEnemy {

    /**
     * The bullet frame of the robot.
     */
    private bulletFrame: Frame;

    constructor(location: GameLocation, frameChangeTime: number, color: string, locationProvider: BaseLocationProvider, bulletProvider: BulletProvider) {
        super(location, frameChangeTime, robotFrames, Explosion02, locationProvider, bulletProvider);

        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], color);
        convertVariableFramesColor(this.offSetFrames.frames, color);

        this.frameProvider = new BackAndForthFrameProvider(this.offSetFrames.frames, 0);
        this.currentFrame = this.frameProvider.getCurrentFrame();
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
}
