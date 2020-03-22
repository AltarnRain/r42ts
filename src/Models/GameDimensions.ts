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
     * The number of pixels from the screen's left where the game is positioned.
     */
    left: number;

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
     * The height of each 'pixel'.
     */
    pixelSize: number;
}
