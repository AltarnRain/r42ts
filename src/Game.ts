
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
import IAnimate from "./Interfaces/IAnimate";
import CtxProvider from "./Providers/CtxProvider";
import DimensionProvider from "./Providers/DimensionProvider";

export default class Game implements IAnimate {
    public animate(tick: number): Promise<void> {

        return new Promise((resolve, reject) => {
            drawGameFieldBackground();
            drawGameFieldBorder();
            drawScoreBoardBackGround();
            resolve();
        });
    }
}

export function StartGame(): void {
    drawScoreBoardBackGround();
    drawGameFieldBorder();
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
function drawGameFieldBorder(): void {
    const ctx = CtxProvider();
    ctx.beginPath();
    ctx.rect(0, DimensionProvider().scoreBoardHeight, DimensionProvider().fullWidth, DimensionProvider().gameFieldHeight);
    ctx.lineWidth = DimensionProvider().pixelSize;
    ctx.strokeStyle = CGAColors.blue;
    ctx.stroke();
    ctx.closePath();
}

/**
 * Draws a solid red recangle where the game's score is displayed.
 */
function drawGameFieldBackground(): void {
    const ctx = CtxProvider();
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, DimensionProvider().fullWidth, DimensionProvider().gameFieldHeight);
    ctx.closePath();
}