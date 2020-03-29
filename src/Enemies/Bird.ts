/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Bird enemy
 * Responsibility:  Defines the behaviour of the bird enemy.
 */

import CGAColors from "../Constants/CGAColors";
import BirdFrames from "../Frames/BirdFrames";
import TickHandler from "../Handlers/TickHandler";
import IDraw from "../Interfaces/IDraw";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import FrameProvider from "../Providers/FrameProvider";
import renderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import { cloneFrames, getFrameDimensions, getNewLocation, getRandomArrayElement, getRandomFrameKeyIndex, randomNumberInRange, setRandomFrameColors } from "../Utility/Lib";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];
const speed = 11;

export default class BirdEnemy implements IDraw {

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
     * Bird location.
     */
    private location: GameLocation;

    /**
     * The current frame that should be rendered.
     */
    private currentFrame: string[][];

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
        this.angle = getRandomArrayElement([2, 358, 178, 182]);

        this.onFrameChange = this.onFrameChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);

        this.frameTickHandler = new TickHandler(80, this.onFrameChange);
        this.colorTickHandler = new TickHandler(40, this.onColorChange);

        this.frames = cloneFrames(BirdFrames);

        this.frameProvider = new FrameProvider(this.frames, getRandomFrameKeyIndex(this.frames));
        this.currentFrame = this.frameProvider.getFrame();

        const birdDimensions = getFrameDimensions(this.currentFrame);

        // Calculate random left position
        const left = randomNumberInRange(
            DimensionProvider().fullWidth - birdDimensions.width,
            birdDimensions.width
        ) ;

        const top = randomNumberInRange(
            DimensionProvider().gameFieldTop + birdDimensions.height + 50,
            DimensionProvider().gameFieldTop + birdDimensions.height);

        this.location = {
            left,
            top,
        };

        const { width, height } = getFrameDimensions(BirdFrames.F0);

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
        this.location = getNewLocation(this.angle, speed, this.location.left, this.location.top);

        if (this.location.left <= 0 || this.location.left >= DimensionProvider().fullWidth - this.frameWidth) {
            this.angle = 180 - this.angle;
        }

        if (this.location.top <= DimensionProvider().gameFieldTop || this.location.top >= DimensionProvider().fullHeight - this.frameHeight) {
            this.angle *= -1;
        }
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
}