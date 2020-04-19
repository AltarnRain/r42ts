
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StaticRenders
 * Responsibility:  Starts the game
 */

import CGAColors from "../Constants/CGAColors";
import CtxProvider from "../Providers/CtxProvider";
import DimensionProvider from "../Providers/DimensionProvider";

const {
    gameFieldTop,
    fullWidth,
    statusBarHeight: scoreBoardHeight,
    maxPixelSize,
    fullHeight,
    gameFieldHeight,
} = DimensionProvider();

export function drawBackground(): void {
    clearGameFieldBackground();
    drawGameFieldBorder();
}

/**
 * Renders the entire canvas black
 */
function clearGameFieldBackground(): void {
    const ctx = CtxProvider();
    ctx.fillStyle = CGAColors.black;
    ctx.fillRect(0, gameFieldTop, fullWidth, fullHeight);
}

/**
 * Draws a solid red recangle where the game's score is displayed.
 */
function drawGameFieldBorder(): void {
    const ctx = CtxProvider();
    ctx.beginPath();
    ctx.rect(0, scoreBoardHeight, fullWidth, gameFieldHeight);
    ctx.lineWidth = maxPixelSize;
    ctx.strokeStyle = CGAColors.blue;
    ctx.stroke();
    ctx.closePath();
}

export function drawGrid(): void {
    const ctx = CtxProvider();
    for (let r = 0; r < 200; r += 1) {
        ctx.beginPath();
        const y = r * 30 + DimensionProvider().gameFieldTop;
        ctx.lineTo(0, y);
        ctx.lineTo(DimensionProvider().fullWidth, y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
    }

    for (let r = 0; r < 200; r += 2) {
        ctx.beginPath();
        const x = r * 20;
        ctx.lineTo(x, 0);
        ctx.lineTo(x, DimensionProvider().fullHeight);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
    }

}