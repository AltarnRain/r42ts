/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame, Frames } from "../Types/Types";
import { getFrameByIndex } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          IFrameProvider
 * Responsibility:  Contract for a FrameProvider
 */

export default abstract class BaseFrameProvider {
    /**
     * Animation frames.
     */
    private framesClone?: Frames;

    /**
     * The current frame for an animated enemy.
     */
    protected frameIndex: number = 0;

    /**
     * Added to the current frame index.
     */
    protected add = 1;

    /**
     * Maximum index for the provided frames.
     */
    protected maxIndex: number;

    /**
     * Initializes the EnemyBase class
     * @param {Frames} frames. Frames.
     * @param {number} startFrameIndex. The first frame to return.
     */
    constructor(startFrameIndex: number) {
        this.frameIndex = startFrameIndex;
        this.maxIndex = Object.keys(frames).length - 1;
    }

    public setFrames(frames: Frames): void {
        this.framesClone = cloneObject(frames);
    }

    /**
     * Gets the current frame.
     * @returns {Frame}. A frame
     */
    public getCurrentFrameClone(): Frame {

        if (this.framesClone === undefined) {
            throw new Error("Set the frames.");
        }

        const returnValue = getFrameByIndex(this.framesClone, this.frameIndex);
        return cloneObject(returnValue);
    }

    public abstract getNextFrameClone(): Frame;

    /**
     * Returns the current frame index.
     * @returns {number}. The current frame index.
     */
    public getCurrentIndex(): number {
        return this.frameIndex;
    }
}