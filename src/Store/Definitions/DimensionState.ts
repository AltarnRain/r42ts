/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DimensionState
 * Responsibility:  Used to store the dimentions of the canvas in the application state
 */

export default interface DimensionState {
    /**
     * Width. Stores the width of the game screen
     */
    width: number;

    /**
     * Height. Stores the height of the game screen
     */
    height: number;
}
