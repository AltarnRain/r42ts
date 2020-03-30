/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          IDraw
 * Responsibility:  Defines a method 'draw'
 */

export interface IDraw {

    /**
     * Draw the object
     * @param {number} tick. Current tick.
     */
    draw(tick: number): void;
}
