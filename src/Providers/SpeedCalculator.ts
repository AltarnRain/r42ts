/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "./DimensionProvider";

/**
 * Module:          speedProvider
 * Responsibility:  Calculate the relative speed based on the screensize.
 */

const {
    gameField
} = dimensionProvider();

export default class SpeedProvider {

    public static calculateSpeed(speed: number): number {
        // 1600 is the size of the canvas width when I was developing the game. All game speeds are based on this.
        return speed * (gameField.right / 1600);
    }
}