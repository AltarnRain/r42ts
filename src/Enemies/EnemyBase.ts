import Asset from "../Models/Asset";
import { getRandomArrayElement, getRandomArrayIndex } from "../Utility/Lib";

/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          EnemyBase
 * Responsibility:  Base class for all enemies
 */

export default abstract class EnemyBase {
    /**
     * Animation frames.
     */
    protected frames: string[][][] = [];

    /**
     * The current frame for an animated enemy.
     */
    protected currentFrameIndex: number = 0;

    /**
     * The current frame for the enemy.
     */
    protected currentFrame: string[][] = [];

    /**
     * The previous game tick.
     */
    protected previousTick = 0;

    /**
     * Initializes the EnemyBase class
     * @param {Asset} asset. Any asset.
     */
    constructor(private asset: Asset) {
    }

    public initialize(): void {

        // Enemy changes color. Pick a random color for each frame.
        if (this.asset.changeColor) {
            this.asset.frames.forEach((frame, frameIndex) =>
                frame.forEach((row, rowIndex) => {
                    this.frames[frameIndex][rowIndex] = [];
                    row.forEach((cell, cellIndex) => {
                        if (cell === "V") {
                            this.frames[frameIndex][rowIndex][cellIndex] = getRandomArrayElement(this.asset.colors);
                        }
                    });
                }));
        } else {
            // Color are set. We can use the asset's frames diretly.
            this.frames = this.asset.frames;
        }

        if (this.asset.randomStartFrame) {
            this.currentFrameIndex = getRandomArrayIndex(this.frames);
        }

        this.currentFrame = this.frames[this.currentFrameIndex];
    }

    /**
     * Gets the name frame from an enemy.
     * @param {tick} tick. Current game tick
     * @returns {string[][]}. A frame
     */
    public getNextFrame(tick: number): string[][] {
        if (tick - this.previousTick > this.asset.animationFrequency) {

            this.setNextFrameIndex();
            const newFrame = this.frames[this.currentFrameIndex];
            this.currentFrame = newFrame;

            return newFrame;
        } else {
            return this.currentFrame;
        }
    }

    private setNextFrameIndex(): void {
        if (this.currentFrameIndex + 1 > this.frames.length - 1) {
            this.currentFrameIndex = 0;
        } else {
            this.currentFrameIndex++;
        }
    }
}