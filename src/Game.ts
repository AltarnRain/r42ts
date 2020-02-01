
/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Game
 * Responsibility:  Starts the game
 */

import CGAColors from "./Constants/CGAColors";
import CtxProvider from "./Providers/CtxProvider";
import DimensionProvider from "./Providers/DimensionProvider";

export function StartGame(): void {
    drawGameFieldBackGround();
    drawScoreBoardBackGround();
}

/**
 * Draws a blue rectangle where the game's action takes place.
 */
function drawScoreBoardBackGround(): void {
    const ctx = CtxProvider();
    ctx.beginPath();
    ctx.fillStyle = CGAColors.red;
    ctx.fillRect(0, 0, DimensionProvider().fullWidth, DimensionProvider().scoreBoardHeight);
    ctx.closePath();
}

/**
 * Draws a solid red recangle where the game's score is displayed.
 */
function drawGameFieldBackGround(): void {
    const ctx = CtxProvider();
    ctx.beginPath();
    ctx.rect(0, DimensionProvider().scoreBoardHeight, DimensionProvider().fullWidth, DimensionProvider().gameFieldHeight);
    ctx.lineWidth = DimensionProvider().pixelSize;
    ctx.strokeStyle = CGAColors.blue;
    ctx.stroke();
    ctx.closePath();
}
