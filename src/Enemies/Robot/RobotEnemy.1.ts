import Explosion02 from "../../Assets/Explosion02";
import { twoPXBullet } from "../../Assets/twoPXBullet";
import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import CGAColors from "../../Constants/CGAColors";
import GameLocation from "../../Models/GameLocation";
import Particle from "../../Particles/Particle";
import FrameProvider from "../../Providers/FrameProvider";
import { Frame } from "../../Types/Types";
import { convertVariableFrameColor, convertVariableFramesColor } from "../../Utility/Frame";
import { cloneObject } from "../../Utility/Lib";
import RobotFrames from "./RobotFrames";
export default class RobotEnemy extends BaseEnemyObject {
    /**
     * The bullet frame of the robot.
     */
    private bulletFrame: Frame;
    /**
     * Angle of the enemy
     */
    private angle: number;
    constructor(location: GameLocation, speed: number, frameChangeTime: number, color: string) {
        super(location, speed, frameChangeTime, RobotFrames, Explosion02);
        convertVariableFrameColor(this.explosion.explosionCenterFrame, color);
        convertVariableFrameColor(this.explosion.particleFrames[0], color);
        convertVariableFramesColor(this.offSetFrames.frames, color);
        this.frameProvider = new FrameProvider(this.offSetFrames.frames, 0);
        this.currentFrame = this.frameProvider.getFrame();
        this.angle = 3;
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
     * Update the robot enemy state.
     * @param {number} tick. Current tick
     */
    public updateState(tick: number): void {
        super.updateState(tick);
        const { width, height } = this.getCurrentFrameDimensions();
        if (this.actualLocation.left + width > fullWidth) {
            this.actualLocation.left = 0;
        }
        if (this.location.top > fullWidth * 0.5) {
            this.actualLocation.top = gameFieldTop + height;
        }
    }
    /**
     * Returns the bullet frame.
     */
    public getBulletParticle(): Particle | undefined {
        return undefined;
    }
    protected getAngle(): number {
        return this.angle;
    }
}
