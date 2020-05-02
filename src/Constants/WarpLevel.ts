/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          WarpLevels
 * Responsibility:  Constants for the warp level.
 */

const {
    pixelSize,
    pixelSize2x,
    gameField
} = dimensionProvider();

export namespace WarpLevelConstants {
    export const top = pixelSize * 8;
    // Counter the actual game's pixels from top to bottom of a warp game.
    export const bottom = top + pixelSize * 72;
    export const height = bottom - top;
    export const left = gameField.left + pixelSize;

    export const right = gameField.right - pixelSize * 2;
}

export default WarpLevelConstants;