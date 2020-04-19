/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion01 from "../../Assets/Explosion01";
import Explosion02 from "../../Assets/Explosion02";
import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
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
    private frames: Frames;

    private explosion: Explosion;
    private angle: number;

    private actualLocation: GameLocation;

    constructor(location: GameLocation, speed: number, frameChangeTime: number, color: string) {
        super(location, speed, frameChangeTime);

        this.frames = cloneObject(RobotFrames.frames);
        convertVariableFramesColor(this.frames, color);

        this.explosion = cloneObject(Explosion02);
        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], CGAColors.green);

        this.frameProvider = new FrameProvider(this.frames, 0);
        this.currentFrame = this.frameProvider.getFrame();

        this.angle = 360;

        this.actualLocation = {...location};
    }

    public getPoints(): number {
        return 100;
    }

    public getCenterLocation(): GameLocation {
        return {} as GameLocation;
    }

    public getExplosion(): Explosion {
        return Explosion01;
    }

    public updateState(tick: number): void {
        super.updateState(tick);
    }

    public getHitbox(): GameRectangle {
        return {} as GameRectangle;
    }
}
