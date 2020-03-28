/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          IDraw
 * Responsibility:  Contract for a class that has something that can be drawn.
 */

export default interface IDraw {
    /**
     * Animate the object
     * @param {number} tick. Current tick.
     */
    draw(tick: number): void;
}
