/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import { PlayerFrame } from "../Player/PlayerFrames";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { appState } from "../State/Store";
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

/**
 * Draws the player lives.
 */
export function draw(): void {
    const { gameState } = appState();
    let left = leftStartPostion;

    // Start five game pixels from the right.
    for (let lives = 1; lives <= 7; lives++) {
        if (lives <= gameState.lives) {
            left = left - DimensionProvider().maxPixelSize * 2 - getFrameDimensions(lifeFrame, DimensionProvider().maxPixelSize).width;
            renderFrame({ left, top }, lifeFrame);
        }
    }
}
