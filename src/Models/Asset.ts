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
     * Colors
     */
    colors: string[];

    /**
     * The angle of travel the asset can start in
     */
    startingAngles: number[];

    /**
     * The speed at which the object travels.
     */
    speed: number;

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

    /**
     * When true this asset's first frame is random.
     */
    randomStartFrame: boolean;

    /**
     * when true this asset initial angle is picked randomly.
     */
    randomAngle: boolean;
}
