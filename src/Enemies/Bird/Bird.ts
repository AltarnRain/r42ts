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
import DimensionProvider from "../../Providers/DimensionProvider";
import FrameProvider from "../../Providers/FrameProvider";
import renderFrame from "../../Render/RenderFrame";
import { Frame, Frames, GameObjectType } from "../../Types/Types";
import { getFrameDimensions, getFrameLocations, getRandomFrameKeyIndex, setRandomFrameColors } from "../../Utility/Frame";
import { cloneObject, getNewLocation, getRandomArrayElement, randomNumberInRange } from "../../Utility/Lib";
import BirdFrames from "./BirdFrames";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];

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
    private frames: Frames;

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

        this.frames = cloneObject(BirdFrames);

        this.frameTickHandler = new TickHandler(80, this.onFrameChange);
        this.colorTickHandler = new TickHandler(40, this.onColorChange);

        this.frameProvider = new FrameProvider(this.frames, getRandomFrameKeyIndex(this.frames));
        this.currentFrame = this.frameProvider.getFrame();

        const { width, height } = getFrameDimensions(BirdFrames.F0);

        // Calculate random left position
        const left = randomNumberInRange(
            DimensionProvider().fullWidth - width,
            width
        );

        const top = randomNumberInRange(
            DimensionProvider().gameFieldTop + height + 250,
            DimensionProvider().gameFieldTop + height);

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

        this.move();

        renderFrame(this.location, this.currentFrame);
    }

    /**
     * Called by a TickHandler when its time to move.
     */
    public move(): void {
        this.location = getNewLocation(this.angle, this.speed, this.location.left, this.location.top);

        if (this.location.left <= 0 || this.location.left >= DimensionProvider().fullWidth - this.frameWidth) {
            this.angle = 180 - this.angle;
        }

        if (this.location.top <= DimensionProvider().gameFieldTop || this.location.top >= DimensionProvider().fullHeight - this.frameHeight) {
            this.angle *= -1;
        }
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
        setRandomFrameColors(this.frames, colors);
    }

    /**
     * Returns the locations occupied by the object.
     */
    public getLocations(): GameLocation[] {
        return getFrameLocations(this.currentFrame, this.location);
    }

    /**
     * Returns the points for the bird.
     */
    public getPoints(): number {
        return 200;
    }
}