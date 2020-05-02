/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

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
    statusBarHeight: number;

    /**
     * Maxiumum height of each pixel.
     */
    pixelSize: number;

    /**
     * Pixel size 2x
     */
    pixelSize2x: number;

    gameFieldWidth: number;

    gameFieldHeight: number;

    gameFieldTop: number;

    gameFieldLeft: number;
}
