/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Hitbox
 * Responsibility:  Defins a hitbox.
 */

/**
 * Model for a hitbox.
 */
export default interface GameRectangle {
    /**
     * Left coordinate
     */
    left: number;

    /**
     * Right coordinate
     */
    right: number;

    /**
     * Top coordinate
     */

    top: number;

    /**
     * Bottom coordinate
     */
    bottom: number;
}
