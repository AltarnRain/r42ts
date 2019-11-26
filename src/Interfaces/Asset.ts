/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Asset
 * Responsibility:  A definition for all assets
 */

export default interface Asset {
    /**
     * x offsets for each frame.
     */
    xOffsets: number[];
    /**
     * y offsets for easch frame.
     */
    yOffsets: number[];
    /**
     * Colors
     */
    colors: string[];

    /**
     * Varies in color.
     * When true the enemy constantly changes in color.
     */
    variesInColor: boolean;

    /**
     * The angle of travel the asset can start in
     */
    startingAngles: number[];

    /**
     * The speed at which the object travels.
     */
    speed: number;

    /**
     * Maximum width of the asset. User to determine if an image falls outside its container.
     */
    maxWidth: number;

    /**
     * Maximum height of the asset. User to determine if an image falls outside the container.
     */
    maxHeight: number;

    /**
     * Change color. When true this enemy shifts between colors.
     */
    changeColor: boolean;

    /**
     * Change color frequency. Number of milliseconds between a color change.
     */
    changeColorFrequency: number;

    /**
     * Animation frequency. Time in milliseconds between animation frames.
     */
    animationFrequency: number;

    /**
     * Animation frames.
     */
    frames: string[][][];
}
