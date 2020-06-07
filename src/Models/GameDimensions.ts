/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameField } from "./GameField";

/**
 * Module:          GameDimensions
 * Responsibility:  Define the game dimension object.
 */

export interface GameDimensions {

    /**
     * The entire with of the game.
     */
    fullGameWidth: number;

    /**
     * The game entire height of the game.
     */
    fullGameHeight: number;

    /**
     * Height of the status bar.
     */
    statusBarBottom: number;

    /**
     * Maxiumum height of each pixel.
     */
    pixelSize: number;

    /**
     * Pixel size 2x
     */
    pixelSize2x: number;

    /**
     * Dimension of the game field. This is where the action takes place
     * So it is very handy to know exactly where it actually is.
     */
    gameField: GameField;

    canvasDimensions: CanvasDimensions;
}

interface CanvasDimensions {

    /**
     * Left position for the canvas
     */
    left: number;

    /**
     * Top position for the canvas.
     */
    top: number;

    displayWidth: number;

    displayHeight: number;
}