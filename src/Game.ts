
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
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

/**
 * Renders the complete game field background.
 */
export function DrawGameField(): void {
    clearBlackground();
    drawScoreBoardBackGround();
    drawGameFieldBorder();
    drawScoreBoardBackGround();
}

/**
 * Renders the entire canvas black
 */
function clearBlackground(): void {
    const ctx = CtxProvider();
    ctx.fillStyle = CGAColors.black;
    ctx.fillRect(0, 0, DimensionProvider().fullWidth, DimensionProvider().fullHeight);
}

/**
 * Draws a blue rectangle where the game's action takes place.
 */
function drawScoreBoardBackGround(): void {
    const ctx = CtxProvider();
    ctx.fillStyle = CGAColors.red;
    ctx.fillRect(0, 0, DimensionProvider().fullWidth, DimensionProvider().scoreBoardHeight);
}

/**
 * Draws a solid red recangle where the game's score is displayed.
 */
function drawGameFieldBorder(): void {
    const ctx = CtxProvider();
    ctx.beginPath();
    ctx.rect(0, DimensionProvider().scoreBoardHeight, DimensionProvider().fullWidth, DimensionProvider().gameFieldHeight);
    ctx.lineWidth = DimensionProvider().maxPixelSize;
    ctx.strokeStyle = CGAColors.blue;
    ctx.stroke();
    ctx.closePath();
}