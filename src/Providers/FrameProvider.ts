/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          FrameProvider
 * Responsibility:  Provide the next frame to animate.
 */

import Frames from "../Types/Frames";

export default class FrameProvider {
    /**
     * Animation frames.
     */
    private frames: Frames;

    /**
     * The current frame for an animated enemy.
     */
    private currentFrameIndex: number = 0;

    /**
     * Added to the current frame index.
     */
    private add = 1;

    /**
     * Maximum index for the provided frames.
     */
    private maxIndex: number;

    /**
     * Initializes the EnemyBase class
     * @param {Asset} asset. Any asset.
     */
    constructor(frames: Frames, startFrameIndex: number) {
        this.frames = frames;
        this.currentFrameIndex = startFrameIndex;
        this.maxIndex = Object.keys(frames).length - 1;
    }

    /**
     * Gets the name frame from an enemy.
     * @param {tick} tick. Current game tick
     * @returns {string[][]}. A frame
     */
    public getFrame(): string[][] {
        const returnValue = this.frames["F" + this.currentFrameIndex.toString()];
        this.setNextFrameIndex();
        return returnValue;
    }

    /**
     * Sets the next frame index.
     */
    private setNextFrameIndex(): void {
        if ((this.currentFrameIndex + 1 > this.maxIndex) || this.currentFrameIndex === 0 ) {
            this.add *= -1;
        }

        this.currentFrameIndex += this.add;
    }
}