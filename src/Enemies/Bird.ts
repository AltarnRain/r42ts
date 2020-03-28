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
import renderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import { calculateObjectLocation, cloneFrames, getNewLocation, getRandomArrayElement, getRandomFrameKeyIndex, setRandomFrameColors } from "../Utility/Lib";

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
     * Creates the object.
     */
    constructor() {
        this.angle = getRandomArrayElement([2, 358, 178, 182]);
        this.angle = getRandomArrayElement([358]);

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
        const left = RandomStartPosition(DimensionProvider().fullWidth, this.currentFrame[0].length * DimensionProvider().pixelSize);
        const top = RandomStartPosition(DimensionProvider().scoreBoardHeight + DimensionProvider().gameFieldTop, this.currentFrame.length) + 50;

        this.location = {
            left,
            top,
        };
    }

    /**
     * Called from autside.
     * @param {number} tick. Called from outside whenever a tick occurs.
     */
    public animate(tick: number): void {

        this.frameTickHandler.tick(tick);
        this.colorTickHandler.tick(tick);
        this.moveTickHandler.tick(tick);

        if (this.currentFrame) {
            renderFrame(this.location, this.currentFrame);
        }
    }

    public onMove(): void {
        const objectLocation = calculateObjectLocation(this.location, this.frames.F0);
        this.location = getNewLocation(this.angle, speed, objectLocation);

        if (this.location.left <= 0 || this.location.left >= DimensionProvider().fullWidth - objectLocation.right) {
            this.angle += 180;
        }

        if (this.location.top <= DimensionProvider().gameFieldTop || this.location.top >= DimensionProvider().fullHeight) {
            this.angle *= -1;
        }
    }

    private onFrameChange(): void {
        this.currentFrame = this.frameProvider.getFrameAndSetNext();
    }

    private onColorChange(): void {
        setRandomFrameColors(this.frames, colors);
    }
}