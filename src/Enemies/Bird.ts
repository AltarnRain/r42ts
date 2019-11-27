/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
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
import IExecute from "../Interfaces/IExecute";
import GameLocation from "../Models/GameLocation";
import DimensionProvider from "../Providers/DimensionProvider";
import FrameProvider from "../Providers/FrameProvider";
import renderFrame from "../Render/RenderFrame";
import Frames from "../Types/Frames";
import { calculateObjectLocation, cloneFrames, getNewLocation, getRandomArrayElement, getRandomArrayIndex, setRandomFrameColors } from "../Utility/Lib";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];
const speed = 5;

export default class BirdEnemy implements IExecute {

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
     * Creates the object.
     */
    constructor() {
        this.angle = getRandomArrayElement([2, 358, 178, 182]);
        this.location = {
            left: Math.random() * DimensionProvider().fullWidth,
            top: Math.random() * 20 + DimensionProvider().gameFieldTop,
        };

        this.onFrameChange = this.onFrameChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onMove = this.onMove.bind(this);

        this.frameTickHandler = new TickHandler(200, this.onFrameChange);
        this.colorTickHandler = new TickHandler(200, this.onColorChange);
        this.moveTickHandler = new TickHandler(200, this.onMove);

        this.frames = cloneFrames(BirdFrames);

        this.frameProvider = new FrameProvider(this.frames, getRandomArrayIndex(BirdFrames[0]));
    }

    /**
     * Called from autside.
     * @param {number} tick. Called from outside whenever a tick occurs.
     */
    public execute(tick: number): void {
        this.frameTickHandler.tick(tick);
        this.colorTickHandler.tick(tick);
        this.moveTickHandler.tick(tick);
    }

    public onMove(): void {

        const objectLocation = calculateObjectLocation(this.location, this.frames.F0);

        this.location = getNewLocation(this.angle, speed, objectLocation);
    }

    private onFrameChange(): void {
        const currentFrame = this.frameProvider.getFrame();
        renderFrame(this.location, currentFrame);
    }

    private onColorChange(): void {
        setRandomFrameColors(this.frames, colors);
    }
}