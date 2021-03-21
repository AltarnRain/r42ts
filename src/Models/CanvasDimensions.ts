/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          CanvasDimensions
 * Responsibility:  Define an object that holds the canvas dimensions and screen location.
 */

export interface CanvasDimensions {
    /**
     * Left position for the canvas
     */
    left: number;

    /**
     * Top position for the canvas.
     */
    top: number;

    /**
     * The width the canvas will be drawn as. Note, this is not the same as the actual canvas width, only the size the
     * canvas is shown on screen.
     */
    displayWidth: number;

    /**
     * The height the canvas will be drawn as. Note, this is not the same as the actual canvas height, only the size the
     * canvas is shown on screen.
     */
    displayHeight: number;
}
