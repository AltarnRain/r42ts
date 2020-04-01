/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Numbers from "../Assets/Numbers";
import CGAColors from "../Constants/CGAColors";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frames } from "../Types/Types";
import { getFrameDimensions, setVariableFramesColor } from "../Utility/Frame";
import { cloneObject, padLeft } from "../Utility/Lib";

/**
 * Module:          ScoreBoard
 * Responsibility:  Draw the ScoreBoard
 */

export default class ScoreBoard {

    /**
     * Player score
     */
    private score: number;

    /**
     * Score board left start position.
     */
    private leftStartPosition: number;

    /**
     * Spacing between numbers
     */
    private spacing: number;

    /**
     * Frames. Contains only numbers
     */
    private frames: Frames;

    constructor() {
        this.leftStartPosition = 4 * DimensionProvider().maxPixelSize;
        this.spacing = 2 * DimensionProvider().maxPixelSize;

        // Create a clone of the number character frames so we can set their color without ruining the asset.
        this.frames = cloneObject(Numbers);

        setVariableFramesColor(this.frames, CGAColors.yellow);

        this.score = 0;
    }

    /**
     * Updates the score.
     * @param {number} score. Score.
     */
    public updateScore(score: number): void {
        this.score = score;
    }

    /**
     * Adds to the score.
     * @param {number} value. Number to add to the score.
     */
    public addToScore(value: number): void {
        this.score += value;
    }

    /**
     * 'Draws' the scoreboard.
     */
    public draw(): void {
        const scoreString = padLeft(this.score.toString(), 6, "0");

        let cnt = 0;
        for (const n of scoreString) {
            const frame = this.frames["N" + n];

            const spacing = cnt === 0 ? 0 : this.spacing;
            let left = cnt * (getFrameDimensions(frame).width + spacing);
            left = this.leftStartPosition + left;
            renderFrame({ left, top: 0 }, frame);
            cnt++;
        }
    }
}