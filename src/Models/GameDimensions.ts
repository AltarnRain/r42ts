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
     * The game field width
     */
    fullWidth: number;

    /**
     * The game field height
     */
    fullHeight: number;

    /**
     * The game field height
     */
    gameFieldHeight: number;

    /**
     * The number of pixels from the screen's top where the game is positioned.
     */
    gameFieldTop: number;

    /**
     * The game field height
     */
    scoreBoardHeight: number;

    /**
     * Maxiumum height of each pixel.
     */
    maxPixelSize: number;

    /**
     * The mimimum height of each pixel.
     */
    minPixelSize: number;

    /**
     * Average pixel size.
     */
    averagePixelSize: number;
}
