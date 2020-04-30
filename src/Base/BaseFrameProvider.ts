/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame, Frames } from "../Types";
import { copyFrame as copyFrame, copyFrames, getFrameByIndex } from "../Utility/Frame";

/**
 * Module:          IFrameProvider
 * Responsibility:  Contract for a FrameProvider
 */

export default abstract class BaseFrameProvider {
    /**
     * Animation frames.
     */
    private frames?: Frames;

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
        this.maxIndex = -1;
    }

    public setFrames(frames: Frames): void {
        this.frames = copyFrames(frames);
        this.maxIndex = frames.length - 1;
    }

    /**
     * Gets the current frame.
     * @returns {Frame}. A frame
     */
    public getCurrentFrame(): Frame {

        if (this.frames === undefined) {
            throw new Error("Set the frames.");
        }

        const returnValue = getFrameByIndex(this.frames, this.frameIndex);
        return copyFrame(returnValue);
    }

    public abstract getNextFrame(): Frame;

    /**
     * Returns the current frame index.
     * @returns {number}. The current frame index.
     */
    public getCurrentIndex(): number {
        return this.frameIndex;
    }
}