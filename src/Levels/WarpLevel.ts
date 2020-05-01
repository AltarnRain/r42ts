/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import { drawBackground, drawWarpBackground } from "../GameScreen/StaticRenders";
import ILevel from "../Interfaces/ILevel";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          WarpLevel
 * Responsibility:  Warp level for the player to pass though.
 */

const backgroundColor: string[] = [
    CGAColors.brown,
    CGAColors.green,
    CGAColors.magenta,
    CGAColors.blue,
];

const {
    averagePixelSize,
} = dimensionProvider();

export default class WarpLevel implements ILevel {

    private gameLoopSubscriptions: Array<(tick?: number) => void> = [];

    public start(): void {
        // Register the background draw function so it runs in the game loop.
        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(drawBackground));

        // Determine which additional color next to white the warp background will have.
        const colorIndex = Math.ceil(Math.random() * backgroundColor.length - 1);
        const additionalColor = backgroundColor[colorIndex];
        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => drawWarpBackground(additionalColor, averagePixelSize)));
    }

    /**
     * Dispose stuff.
     */
    public dispose(): void {
        // Dispose all game loop subscriptions.
        this.gameLoopSubscriptions.forEach((s) => s());
    }
}