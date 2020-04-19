/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion02 from "../../Assets/Explosion02";
import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import GameLocation from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import DimensionProvider from "../../Providers/DimensionProvider";
import FrameProvider from "../../Providers/FrameProvider";
import { convertVariableFrameColor, convertVariableFramesColor } from "../../Utility/Frame";
import RobotFrames from "./RobotFrames";

/**
 * Module:          RobotEnemey
 * Responsibility:  Handles the Robot enemeny first seen in level 2.
 */

const {
    fullWidth
} = DimensionProvider();

export default class RobotEnemey extends BaseEnemyObject {

    private angle: number;

    constructor(location: GameLocation, speed: number, frameChangeTime: number, color: string) {
        super(location, speed, frameChangeTime, RobotFrames, Explosion02);

        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], color);
        convertVariableFramesColor(this.offSetFrames.frames, color);

        this.frameProvider = new FrameProvider(this.offSetFrames.frames, 0);
        this.currentFrame = this.frameProvider.getFrame();

        this.angle = 360;

        this.location = this.getOffsetLocation();
    }

    public getPoints(): number {
        return 100;
    }

    public updateState(tick: number): void {
        super.updateState(tick);

        const { width } = this.getCurrentFrameDimensions();

        if (this.actualLocation.left + width > fullWidth) {
            this.actualLocation.left = 0;
        }
    }

    public getHitbox(): GameRectangle {
        return {} as GameRectangle;
    }

    protected getAngle(): number {
        return this.angle;
    }
}
