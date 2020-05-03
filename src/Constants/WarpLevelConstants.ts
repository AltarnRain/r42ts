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
    gameField
} = dimensionProvider();

export namespace WarpLevelConstants {
    export const heightPixelCount = 72;
    export const top = pixelSize * 8;
    export const height = heightPixelCount * pixelSize;
    export const left = gameField.left + pixelSize;
    export const right = gameField.right - pixelSize * 2;
    export const bottom = top + height;
    export const width = pixelSize * 16;
}

export default WarpLevelConstants;