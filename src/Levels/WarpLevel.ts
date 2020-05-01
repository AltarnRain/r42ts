/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILevel from "../Interfaces/ILevel";
import CGAColors from "../Constants/CGAColors";
import dimensionProvider from "../Providers/DimensionProvider";
import ctxProvider from "../Providers/CtxProvider";
import GameLoop from "../GameLoop";
import { drawBackground } from "../GameScreen/StaticRenders";

/**
 * Module:          WarpLevel
 * Responsibility:  Warp level for the player to pass though.
 */

const backgroundColorCombos: string[][] = [
    [CGAColors.white, CGAColors.brown],
];

const {
    gameFieldTop,
    averagePixelSize,
    fullWidth,
    fullHeight
} = dimensionProvider();

const ctx = ctxProvider();

export default class WarpLevel implements ILevel {

    public start(): void {
        // Register the background draw function so it runs in the game loop.
        GameLoop.registerBackgroundDrawing(drawBackground);
        GameLoop.registerBackgroundDrawing(this.drawWarp);
    }

    private drawWarp() {
        const top = gameFieldTop + averagePixelSize;
        const bottom = fullHeight - averagePixelSize * 20;
        const height = bottom - top;
        let left = averagePixelSize;
        let lineColorIndex = 0;

        while (fullWidth - averagePixelSize > left) {
            if (lineColorIndex === 0) {
                lineColorIndex = 1;
            } else if (lineColorIndex === 1) {
                lineColorIndex = 0;
            }

            ctx.fillStyle = backgroundColorCombos[0][lineColorIndex];
            ctx.fillRect(left, top, averagePixelSize, height);
            left += averagePixelSize;
        }
    }

    public dispose(): void {
        // TODO
    }
}