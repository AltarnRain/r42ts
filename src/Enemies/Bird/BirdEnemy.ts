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
     * Frame width
     */
    private frameWidth: number;

    /**
     * Frame height.
     */
    private frameHeight: number;

    /**
     * The actual location of the bird without offsets.
     */
    private actualLocation: GameLocation;

    /**
     * Precaculated offsets for every frame.
     */
    private offSets: GameLocation[];

    /**
     * Creates the object.
     */
    constructor(location: GameLocation, speed: number) {
        super(location, speed);
        this.angle = getRandomArrayElement([2, 358, 178, 182]);

        this.onFrameChange = this.onFrameChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);

        this.offsetFrames = cloneObject(BirdFrames);

        this.frameTickHandler = new TickHandler(80, this.onFrameChange);
        this.colorTickHandler = new TickHandler(40, this.onColorChange);

        this.frameProvider = new FrameProvider(this.offsetFrames.frames, getRandomFrameKeyIndex(this.offsetFrames.frames));
        this.currentFrame = this.frameProvider.getFrame();

        const { width, height } = getFrameDimensions(this.currentFrame, maxPixelSize);

        this.actualLocation = {...this.location};

        this.offSets = BirdFrames.offSets.map((o) => {
            return {
                left: o.left * averagePixelSize,
                top: o.top * averagePixelSize,
            };
        });

        this.location = this.calculateOffsetLocation();

        this.frameWidth = width;
        this.frameHeight = height;
    }

    /**
     * Updates the objects state.
     */
    public updateState(tick: number): void {
        this.frameTickHandler.tick(tick);
        this.colorTickHandler.tick(tick);

        this.actualLocation = getLocation(this.actualLocation, this.angle, this.currentSpeed);

        this.location = this.calculateOffsetLocation();

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
     * Calculates the offsetLocation
     * @returns {GameLocation}. GameLocation offset to let the frames render over one another.
     */
    private calculateOffsetLocation(): GameLocation {
        const frameOffsets = this.offSets[this.frameProvider.getCurrentIndex()];
        return getOffsetLocation(this.actualLocation, frameOffsets.left, frameOffsets.top);
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
        const dimensions = getFrameDimensions(this.currentFrame, averagePixelSize);
        return getFrameHitbox(this.location, dimensions.width, dimensions.height, negativeMaxPixelSize, 0);
    }

    /**
     * Returns the center location of the object.
     * @returns {GameLocation}. GameLocation located at the center of the object.
     */
    public getCenterLocation(): GameLocation {
        return getFrameCenter(this.location, this.currentFrame, averagePixelSize);
    }
}