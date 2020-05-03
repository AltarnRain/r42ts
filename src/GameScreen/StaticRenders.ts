
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import WarpLevelConstants from "../Constants/WarpLevelConstants";
import { GameRectangle } from "../Models/GameRectangle";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          StaticRenders
 * Responsibility:  Starts the game
 */

const {
    pixelSize,
    gameField,
    statusBarBottom,
    fullGameWidth,
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
    ctx.fillRect(gameField.left, gameField.top, gameField.right, gameField.bottom);
}

/**
 * Draws a solid red recangle where the game's score is displayed.
 */
function drawGameFieldBorder(): void {
    const ctx = ctxProvider();
    ctx.fillStyle = CGAColors.blue;

    // Draw the top field border.
    ctx.fillRect(0, statusBarBottom, fullGameWidth, pixelSize);

    // Draw the right field border.
    ctx.fillRect(gameField.right, statusBarBottom, pixelSize, gameField.bottom);

    // // Draw the bottom field border.
    ctx.fillRect(0, gameField.bottom, fullGameWidth, pixelSize);

    // // Draw the left field border.
    ctx.fillRect(0, statusBarBottom, pixelSize, gameField.bottom);
}

/**
 * Draws the background of the warp level.
 * @param {string} additionalColor. The additional color.
 */
export function drawWarpBackground(additionalColor: string, gate: GameRectangle[]): void {
    const ctx = ctxProvider();

    // The first line in a warp level is always white.
    // we'll use this flag to altername between white and a randonly picked color.
    let drawWhite = true;
    let left = WarpLevelConstants.left;

    while (WarpLevelConstants.right >= left) {
        if (drawWhite) {
            ctx.fillStyle = CGAColors.white;
            drawWhite = false;
        } else {
            ctx.fillStyle = additionalColor;
            drawWhite = true;
        }

        ctx.fillRect(left, WarpLevelConstants.top, pixelSize, WarpLevelConstants.bottom);
        left += pixelSize;
    }

    ctx.fillStyle = "black";

    gate.forEach((r) => ctx.fillRect(r.left, r.top, r.right - r.left, r.bottom - r.top));
}

/**
 * Debugggin function. Draws a grid in the screen for animation alignment.
 */
// export function DEBUGGING_drawGrid(): void {
//     const ctx = ctxProvider();
//     for (let r = 0; r < 200; r += 1) {
//         ctx.beginPath();
//         const y = r * 30 + gameFieldTop;
//         ctx.lineTo(0, y);
//         ctx.lineTo(fullWidth, y);
//         ctx.lineWidth = 1;
//         ctx.strokeStyle = "white";
//         ctx.stroke();
//         ctx.closePath();
//     }

//     for (let r = 0; r < 200; r += 2) {
//         ctx.beginPath();
//         const x = r * 20;
//         ctx.lineTo(x, 0);
//         ctx.lineTo(x, fullHeight);
//         ctx.lineWidth = 1;
//         ctx.strokeStyle = "white";
//         ctx.stroke();
//         ctx.closePath();
//     }
// }