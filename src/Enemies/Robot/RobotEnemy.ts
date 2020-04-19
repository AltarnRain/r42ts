/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion02 from "../../Assets/Explosion02";
import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import CGAColors from "../../Constants/CGAColors";
import Explosion from "../../Models/Explosion";
import GameLocation from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import FrameProvider from "../../Providers/FrameProvider";
import { Frames } from "../../Types/Types";
import { convertVariableFrameColor, convertVariableFramesColor } from "../../Utility/Frame";
import { cloneObject } from "../../Utility/Lib";
import RobotFrames from "./RobotFrames";

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemeny first seen in level 2.
 */

export default class RobotEnemey extends BaseEnemyObject {

    private angle: number;

    constructor(location: GameLocation, speed: number, frameChangeTime: number, color: string) {
        super(location, speed, frameChangeTime, RobotFrames, Explosion02);


        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], CGAColors.green);

        this.currentFrame = this.frameProvider.getFrame();

        this.angle = 360;
    }

    public getPoints(): number {
        return 100;
    }

    public updateState(tick: number): void {
        super.updateState(tick);
    }

    public getHitbox(): GameRectangle {
        return {} as GameRectangle;
    }

    protected getAngle(): number {
        return this.angle;
    }

}
