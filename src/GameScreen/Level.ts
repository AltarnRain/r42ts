/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Numbers from "../Assets/Numbers";
import CGAColors from "../Constants/CGAColors";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { convertVariableFramesColor, getFrameByIndex } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { padLeft } from "../Utility/String";

/**
 * Module:          Level indicator
 * Responsibility:  Show the level the player is playing
 */

/**
 * Current level.
 */
let level: number = 1;

// Calculate positions. These never change.
const rightNumberLeft = DimensionProvider().fullWidth - DimensionProvider().maxPixelSize * 8;
const leftNumberLeft = DimensionProvider().fullWidth - DimensionProvider().maxPixelSize * 13;

// Create frames.
const frames = cloneObject(Numbers);
convertVariableFramesColor(frames, CGAColors.yellow);

/**
 * Set the level.
 * @param {number} value. Value to set the level to.
 */
export function setLevel(value: number): void {
    level = value;
}

/**
 * Adds one level.
 */
export function addLevel(): void {
    level++;
}

/**
 * Draw the level indicator.
 */
export function draw(): void {
    const paddedLevelString = padLeft(level.toString(), 2, "0");

    const rightNumber = parseInt(paddedLevelString[1], 10);
    const leftNumber = parseInt(paddedLevelString[0], 10);

    const rightFrame = getFrameByIndex(frames, rightNumber);
    const leftFrame = getFrameByIndex(frames, leftNumber);

    renderFrame({
        left: leftNumberLeft, top: 0
    }, leftFrame);

    renderFrame({ left: rightNumberLeft, top: 0 }, rightFrame);
}
