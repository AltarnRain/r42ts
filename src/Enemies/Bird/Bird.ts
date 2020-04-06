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
import { getFrameCenter, getFrameDimensions, getFrameHitbox, getRandomFrameKeyIndex, setRandomFrameColors } from "../../Utility/Frame";
import { cloneObject, getRandomArrayElement, randomNumberInRange } from "../../Utility/Lib";
import { getOffsetLocation, getNewLocation } from "../../Utility/Location";
import { BirdFrames } from "./BirdFrames";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];

const {
    averagePixelSize,
    maxPixelSize,
    fullHeight,
    gameFieldTop,
    fullWidth
} = DimensionProvider();

export default class BirdEnemy extends BaseEnemyObject {
    /**
     * Handles frame ticks.
     */
    private frameTickHandler: TickHandler;

    /**
     * Hanels color changes.
     */
    private colorTickHandler: TickHandler;

    /**
     * The frame provider.
     */
    private frameProvider: FrameProvider;

    /**
     * Angle
     */
    private angle: number = 0;

    /**
     * Bird fames
     */
    private offsetFrames: OffsetFrames;

    /**
     * The current frame that should be rendered.
     */
    private currentFrame: Frame;

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
    constructor() {
        super(0);
        this.angle = getRandomArrayElement([2, 358, 178, 182]);

        this.onFrameChange = this.onFrameChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);

        this.offsetFrames = cloneObject(BirdFrames);

        this.frameTickHandler = new TickHandler(80, this.onFrameChange);
        this.colorTickHandler = new TickHandler(40, this.onColorChange);

        this.frameProvider = new FrameProvider(this.offsetFrames.frames, getRandomFrameKeyIndex(this.offsetFrames.frames));
        this.currentFrame = this.frameProvider.getFrame();

        const { width, height } = getFrameDimensions(this.currentFrame, maxPixelSize);

        // Calculate random left position
        const left = randomNumberInRange(
            fullWidth - width,
            width
        );

        const top = randomNumberInRange(
            gameFieldTop + height + averagePixelSize * 5,
            gameFieldTop + height);

        this.location = {
            left,
            top,
        };

        this.frameWidth = width;
        this.frameHeight = height;
    }

    /**
     * Called from autside.
     * @param {number} tick. Called from outside whenever a tick occurs.
     */
    public draw(tick: number): void {
        this.frameTickHandler.tick(tick);
        this.colorTickHandler.tick(tick);

        const location = this.move();

        renderFrame(location, this.currentFrame);
    }

    /**
     * Called by a TickHandler when its time to move.
     */
    public move(): GameLocation {

        this.location = getNewLocation(this.location, this.angle, this.speed);

        const frameOffsets = BirdFrames.offSets[this.frameProvider.getCurrentIndex()];
        const offsetLocation = getOffsetLocation(this.location, frameOffsets, averagePixelSize);

        if (offsetLocation.left <= 0 || offsetLocation.left >= fullWidth - this.frameWidth) {
            this.angle = 180 - this.angle;
        }

        if (offsetLocation.top <= gameFieldTop || offsetLocation.top >= fullHeight - this.frameHeight) {
            this.angle *= -1;
        }

        return offsetLocation;
    }

    /**
     * Returns the explosion asset.
     * @returns {Explosion}. An explosion asset.
     */
    public getExplosion(): Explosion {
        return Explosion01;
    }

    /**
     * Returns the game object type.
     * @returns {GameObjectType}. The game object type.
     */
    public getObjectType(): GameObjectType {
        return "enemy";
    }

    /**
     * Called by a TickHandler when the next frame is up.
     */
    private onFrameChange(): void {
        this.currentFrame = this.frameProvider.getNextFrame();
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        setRandomFrameColors(this.offsetFrames.frames, colors);
    }

    /**
     * Returns the points for the bird.
     */
    public getPoints(): number {
        return 200;
    }

    /**
     * Return the birds remaining hitpoints. 0.
     */
    public getHitpoints(): number {
        return 0;
    }

    /**
     * Returns the bird's hitbox.
     * @returns {GameRectangle}. Bird's hitbox.
     */
    public getHitbox(): GameRectangle {
        const birdHitbox = getFrameHitbox(this.location, this.currentFrame, averagePixelSize);
        return birdHitbox;
    }

    /**
     * Returns the center location of the object.
     * @returns {GameLocation}. GameLocation located at the center of the object.
     */
    public getCenterLocation(): GameLocation {
        return getFrameCenter(this.location, this.currentFrame, averagePixelSize);
    }
}