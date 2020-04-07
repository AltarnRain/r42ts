/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Numbers from "../Assets/Numbers";
import CGAColors from "../Constants/CGAColors";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { convertVariableFramesColor, getFrameByIndex, getFrameDimensions } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { padLeft } from "../Utility/String";

/**
 * Module:          ScoreBoard
 * Responsibility:  Draw the ScoreBoard
 */

const leftStartPosition = 4 * DimensionProvider().maxPixelSize;
const spacing = 2 * DimensionProvider().maxPixelSize;
const frames = cloneObject(Numbers);

let score = 0;

/**
 * Updates the score.
 * @param {number} score. Score.
 */
export function updateScore(value: number): void {
    score = value;
}

/**
 * Adds to the score.
 * @param {number} value. Number to add to the score.
 */
export function addToScore(value: number): void {
    score += value;
}

/**
 * Draws the scoreboard.
 */
export function draw(): void {
    const scoreString = padLeft(score.toString(), 6, "0");

    let cnt = 0;
    for (const n of scoreString) {
        const frame = getFrameByIndex(frames, parseInt(n, 10));

        const actualSpacing = cnt === 0 ? 0 : spacing;
        let left = cnt * (getFrameDimensions(frame, DimensionProvider().maxPixelSize).width + actualSpacing);
        left = leftStartPosition + left;
        renderFrame({ left, top: 0 }, frame);
        cnt++;
    }
}
