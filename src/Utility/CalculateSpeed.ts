/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          CalculateSpeed
 * Responsibility:  Provides a function to calculate a speed.
 */

/**
 * Calculates a speed.
 * @param {number} speed. Speed in pixels per tick.
 * @param {number} width. Available width.
 * @param {number} fps. Supported fps.
 */
export default function calculateSpeed(speed: number, gameSpeed: number): number {
    // 1600 is the size of the canvas width when I was developing the game. All game speeds are based on this.
    // 60 is the fps of Chrome on my laptop, but some screens have
    // different refresh rates.
    const speedFactor = (100 / gameSpeed) * 60;
    return speed * (60 / speedFactor);
}