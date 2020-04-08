/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import { PlayerFrame } from "../Player/PlayerShip/PlayerFrames";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { getFrameDimensions, setFrameColor } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          Lives
 * Responsibility:  Draws player lives
 */

const lifeFrame = cloneObject(PlayerFrame);
setFrameColor(lifeFrame, CGAColors.yellow);

const top = DimensionProvider().maxPixelSize;
const leftStartPostion = DimensionProvider().fullWidth - DimensionProvider().maxPixelSize * 18;

let lifeCount = 0;

/**
 * Sets the number of player lives.
 * @param {number} lives. Player lives.
 */
export function setLives(value: number): void {
    lifeCount = value;
}

/**
 * Adds one life.
 */
export function addLife(): void {
    lifeCount++;
}

/**
 * Removes one life.
 */
export function removeLife(): void {
    lifeCount--;
}

/**
 * Draws the player lives.
 */
export function draw(): void {

    let left = leftStartPostion;

    // Start five game pixels from the right.
    for (let lives = 1; lives <= 7; lives++) {
        if (lives <= lifeCount) {
            left = left - DimensionProvider().maxPixelSize * 2 - getFrameDimensions(lifeFrame, DimensionProvider().maxPixelSize).width;
            renderFrame({ left, top }, lifeFrame);
        }
    }
}
