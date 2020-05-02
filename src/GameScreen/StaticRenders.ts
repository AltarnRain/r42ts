
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          StaticRenders
 * Responsibility:  Starts the game
 */

const {
    gameFieldTop,
    fullWidth,
    statusBarHeight: scoreBoardHeight,
    pixelSize,
    fullHeight,
    gameFieldHeight,
} = dimensionProvider();

export function drawBackground(): void {
    clearGameFieldBackground();
    drawGameFieldBorder();
}

/**
 * Renders the entire canvas black
 */
function clearGameFieldBackground(): void {
    const ctx = ctxProvider();
    ctx.fillStyle = CGAColors.black;
    ctx.fillRect(0, gameFieldTop, fullWidth, fullHeight);
}

/**
 * Draws a solid red recangle where the game's score is displayed.
 */
function drawGameFieldBorder(): void {
    const ctx = ctxProvider();
    ctx.beginPath();
    ctx.rect(0, scoreBoardHeight, fullWidth, gameFieldHeight);
    ctx.lineWidth = pixelSize;
    ctx.strokeStyle = CGAColors.blue;
    ctx.stroke();
    ctx.closePath();
}

/**
 * Draws the background of the warp level.
 * @param {string} additionalColor. The additional color.
 */
export function drawWarpBackground(additionalColor: string): void {
    const ctx = ctxProvider();

    const top = gameFieldTop + pixelSize;
    const bottom = fullHeight - pixelSize * 20;
    const height = bottom - top;
    let left = pixelSize;

    // The first line in a warp level is always white.
    // we'll use this flag to altername between white and a randonly picked color.
    let drawWhite = true;

    while (fullWidth - pixelSize > left) {
        if (drawWhite) {
            ctx.fillStyle = CGAColors.white;
            drawWhite = false;
        } else {
            ctx.fillStyle = additionalColor;
            drawWhite = true;
        }

        ctx.fillRect(left, top, pixelSize, height);
        left += pixelSize;
    }
}

/**
 * Debugggin function. Draws a grid in the screen for animation alignment.
 */
export function DEBUGGING_drawGrid(): void {
    const ctx = ctxProvider();
    for (let r = 0; r < 200; r += 1) {
        ctx.beginPath();
        const y = r * 30 + gameFieldTop;
        ctx.lineTo(0, y);
        ctx.lineTo(fullWidth, y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
    }

    for (let r = 0; r < 200; r += 2) {
        ctx.beginPath();
        const x = r * 20;
        ctx.lineTo(x, 0);
        ctx.lineTo(x, fullHeight);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
    }
}