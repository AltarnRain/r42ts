/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          SetCanvasDimensions
 * Responsibility:  A function that sets the canvas dimensions
 */

const {
    fullGameHeight,
    fullGameWidth,
    canvasDimensions,
} = dimensionProvider();

/**
 * setCanvasDimensions. Set the canvas width and height to the optimal size for the game.
 * If the game is running fullscreen the canvas's style properties will be used to stretch the image
 * to take up as much space as possible while maintaining aspect ratio,
 */
export default function setCanvasDimensions(): void {
    // Set canvas dimensions.
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
        const left = `${canvasDimensions.left}px`;
        const top = `${canvasDimensions.top}px`;
        const canvasDisplayWidth = `${canvasDimensions.displayWidth}px`;
        const canvasDisplayHeight = `${canvasDimensions.displayHeight}px`;

        canvas.style.left = left;
        canvas.style.top = top;
        canvas.style.width = canvasDisplayWidth;
        canvas.style.height = canvasDisplayHeight;
        canvas.width = fullGameWidth;
        canvas.height = fullGameHeight;
    }
}