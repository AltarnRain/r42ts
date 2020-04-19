/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Bird enemy
 * Responsibility:  Defines the behaviour of the bird enemy.
 */

import Explosion01 from "../../Assets/Explosion01";
import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
import Explosion from "../../Models/Explosion";
import GameLocation from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { OffsetFrames } from "../../Models/OffsetFrames";
import DimensionProvider from "../../Providers/DimensionProvider";
import FrameProvider from "../../Providers/FrameProvider";
import renderFrame from "../../Render/RenderFrame";
import { Frame, GameObjectType } from "../../Types/Types";
import { getRandomArrayElement } from "../../Utility/Array";
import { getFrameCenter, getFrameDimensions, getFrameHitbox, getRandomFrameKeyIndex, setRandomFrameColors } from "../../Utility/Frame";
import { cloneObject, randomNumberInRange } from "../../Utility/Lib";
import { getLocation, getOffsetLocation } from "../../Utility/Location";
import { BirdFrames } from "./BirdFrames";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];

const {
    averagePixelSize,
    maxPixelSize,
    fullHeight,
    gameFieldTop,
    fullWidth,
} = DimensionProvider();

const negativeMaxPixelSize = maxPixelSize * -1;

export default class BirdEnemy extends BaseEnemyObject {

    /**
     * Hanels color changes.
     */
    private colorTickHandler: TickHandler;

    /**
     * Angle
     */
    private angle: number = 0;

    /**
     * Frame width
     */
    private frameWidth: number;

    /**
     * Frame height.
     */
    private frameHeight: number;

    /**
     * Creates the object.
     */
    constructor(location: GameLocation, speed: number, frameChangetime: number) {
        super(location, speed, frameChangetime, BirdFrames, Explosion01);
        this.angle = getRandomArrayElement([2, 358, 178, 182]);

        this.onColorChange = this.onColorChange.bind(this);

        this.colorTickHandler = new TickHandler(40, this.onColorChange);

        this.frameProvider = new FrameProvider(this.offSetFrames.frames, getRandomFrameKeyIndex(this.offSetFrames.frames));
        this.currentFrame = this.frameProvider.getFrame();

        const { width, height } = getFrameDimensions(this.currentFrame, maxPixelSize);

        this.frameWidth = width;
        this.frameHeight = height;
    }

    /**
     * Updates the objects state.
     */
    public updateState(tick: number): void {
        super.updateState(tick);

        this.colorTickHandler.tick(tick);

        const leftLimit = averagePixelSize * 2;
        const rightLimit = fullWidth - this.frameWidth - averagePixelSize * 2;

        if (this.location.left <= leftLimit || this.location.left >= rightLimit) {
            this.angle = 180 - this.angle;
        }

        if (this.location.top <= gameFieldTop || this.location.top >= fullHeight - this.frameHeight) {
            this.angle *= -1;
        }
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        setRandomFrameColors(this.offSetFrames.frames, colors);
    }

    /**
     * Returns the points for the bird.
     */
    public getPoints(): number {
        return 200;
    }

    /**
     * Returns the bird's hitbox.
     * @returns {GameRectangle}. Bird's hitbox.
     */
    public getHitbox(): GameRectangle {
        const dimensions = getFrameDimensions(this.currentFrame, averagePixelSize);
        return getFrameHitbox(this.location, dimensions.width, dimensions.height, negativeMaxPixelSize, 0);
    }

    protected getAngle(): number {
        return this.angle;
    }
}