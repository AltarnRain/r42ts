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

export default function speedProvider(speed: number): number {
    // 1793 is the size of the canvas when I was developing the game. All game speeds are based on this.
    return speed * (gameField.right / 1793);
}