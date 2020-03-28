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
import IAnimate from "../Interfaces/IAnimate";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import FrameProvider from "../Providers/FrameProvider";
import { RandomStartPosition } from "../Providers/StartPositionProvider";
import RenderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import { cloneFrames, getFrameDimensions, getNewLocation, getRandomArrayElement, getRandomFrameKeyIndex, setRandomFrameColors } from "../Utility/Lib";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];
const speed = 15;

export default class BirdEnemy implements IAnimate {

    /**
     * Handles frame ticks.
     */
    private frameTickHandler: TickHandler;

    /**
     * Hanels color changes.
     */
    private colorTickHandler: TickHandler;

    /**
     * Handles movement.
     */
    private moveTickHandler: TickHandler;

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
        this.onMove = this.onMove.bind(this);

        this.frameTickHandler = new TickHandler(200, this.onFrameChange);
        this.colorTickHandler = new TickHandler(200, this.onColorChange);
        this.moveTickHandler = new TickHandler(200, this.onMove);

        this.frames = cloneFrames(BirdFrames);

        this.frameProvider = new FrameProvider(this.frames, getRandomFrameKeyIndex(this.frames));
        this.currentFrame = this.frameProvider.getFrame();

        // Calculate random left position
        const left = RandomStartPosition(DimensionProvider().fullWidth, this.currentFrame[0].length * DimensionProvider().maxPixelSize);
        const top = RandomStartPosition(DimensionProvider().scoreBoardHeight + DimensionProvider().gameFieldTop, this.currentFrame.length) + 50;

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
    public animate(tick: number): void {
        this.frameTickHandler.tick(tick);
        this.colorTickHandler.tick(tick);
        this.moveTickHandler.tick(tick);
        RenderFrame(this.location, this.currentFrame);
    }

    /**
     * Called by a TickHandler when its time to move.
     */
    public onMove(): void {
        this.location = getNewLocation(this.angle, speed, this.location.left, this.location.top);

        if (this.location.left <= 0 || this.location.left >= DimensionProvider().fullWidth - this.frameWidth) {
            this.angle += 180;
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