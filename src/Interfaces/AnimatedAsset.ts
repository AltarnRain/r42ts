/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          AnimatedAsset
 * Responsibility:  Define the properties of an animated asset.
 */

import { Asset } from "./Asset";

/**
 * Defines an animation.
 */
export interface AnimatedAsset {
    /**
     * Animation frames.
     */
    asset: Asset;
    /**
     * The start frame
     */
    startFrame?: number;
    /**
     * start color
     */
    startColor?: number;
    /**
     * The current frame of the animation.
     */
    currentFrame?: number;
    /**
     * Index of the current color for the raster image.
     */
    currentColor?: number;
}
