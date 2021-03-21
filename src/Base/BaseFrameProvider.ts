/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import IGetCurrentIndex from "../Interfaces/IGetCurrentFrame";
import Frame from "../Types/Frame";
import { copyFrame, copyFrames, getFrameByIndex } from "../Utility/Frame";

/**
 * Module:          BaseFrameProvider
 * Responsibility:  BaseClass for most frame providers.
 */

export default abstract class BaseFrameProvider implements IGetCurrentIndex {
    /**
     * Animation frames.
     */
    private frames?: Frame[];

    /**
     * The current frame for an animated enemy.
     */
    protected frameIndex: number;

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

    /**
     * Called from within an enemy to set the frames.
     * @param {Frame[]} frames.
     */
    public setFrames(frames: Frame[]): void {
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

    /**
     * Returns gets the next frame.
     * @returns {Frame}.
     */
    public abstract getNextFrame(): Frame;

    /**
     * Returns the current frame index.
     * @returns {number}. The current frame index.
     */
    public getCurrentIndex(): number {
        return this.frameIndex;
    }
}