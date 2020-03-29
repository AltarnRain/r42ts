/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { getNumberFrames } from "../Assets/Characters";
import CGAColors from "../Constants/CGAColors";
import IDraw from "../Interfaces/IDraw";
import DimensionProvider from "../Providers/DimensionProvider";
import Frames from "../Types/Frames";
import { cloneFrames, setVariableFrameColors, padLeft } from "../Utility/Lib";
import renderFrame from "../Render/RenderFrame";

/**
 * Module:          Level indicator
 * Responsibility:  Show the level the player is playing
 */

export class LevelIndicator implements IDraw {
    /**
     * Frames to render.
     */
    private frames: Frames;

    /**
     * Position for the left number.
     */
    private leftNumberLeft: number;

    /**
     * Positino for the right number.
     */
    private rightNumberLeft: number;

    /**
     * Current level.
     */
    private level: number;

    /**
     * Constructs the class.
     */
    constructor() {

        // Calculate positions. These never change.
        this.rightNumberLeft = DimensionProvider().fullWidth - DimensionProvider().maxPixelSize * 8;
        this.leftNumberLeft = DimensionProvider().fullWidth - DimensionProvider().maxPixelSize * 13;

        this.frames = cloneFrames(getNumberFrames());

        setVariableFrameColors(this.frames, CGAColors.yellow);

        this.level = 1;
    }

    /**
     * Set the level.
     * @param {number} value. Value to set the level to.
     */

    public setLevel(value: number): void {
        this.level = value;
    }

    /**
     * Adds one level.
     */
    public addLevel(): void {
        this.level++;
    }

    /**
     * Draw the level indicator.
     */
    public draw(_: number): void {
        const paddedLevelString = padLeft(this.level.toString(), 2, "0");

        const rightNumber = paddedLevelString[1];
        const leftNumber = paddedLevelString[0];

        const rightFrame = this.frames["N" + rightNumber];
        const leftFrame = this.frames["N" + leftNumber];

        renderFrame({ left: this.leftNumberLeft, top: 0 }, leftFrame);
        renderFrame({ left: this.rightNumberLeft, top: 0 }, rightFrame);
    }
}
