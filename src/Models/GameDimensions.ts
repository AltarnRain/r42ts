/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameRectangle } from "./GameRectangle";

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

    gameField: GameField;
}

export interface GameField extends GameRectangle {
    width: number;
    height: number;
}