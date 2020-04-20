/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          speedProvider
 * Responsibility:  Calculate the relative speed based on the screensize.
 */

import DimensionProvider from "./DimensionProvider";

const {
    fullWidth
} = DimensionProvider();

export default function speedProvider(speed: number): number {
    // 1793 is the size of the canvas when I was developing the game. All game speeds are based on this.
    return speed * (fullWidth / 1793);
}