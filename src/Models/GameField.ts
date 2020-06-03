/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameField
 * Responsibility:  Define the GameField
 */

import GameRectangle from "./GameRectangle";
export interface GameField extends GameRectangle {

    /**
     * With of the game field in real pixels.
     */
    width: number;

    /**
     * Height of the game field in real piels.
     */
    height: number;
}
