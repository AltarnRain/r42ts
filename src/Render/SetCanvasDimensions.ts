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
    fullscreen,
    canvasLeft,
    canvasTop,
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

        // Initialize windows mode by default.
        let left = `${canvasLeft}px`;
        let top = `${canvasTop}px`;
        let canvasDisplayWidth = `${fullGameWidth}px`;
        let canvasDisplayHeight = `${fullGameHeight}px`;

        if (fullscreen) {
            // Ok, the game is running in full screen. We'll set the canvas's style properties
            // to optimize the available game. This will make things a bit fuzzy but the
            // game completely relies on dimensions being an integer.
            const resizeFactor = fullGameHeight / screen.height;

            // Let do this on the assumtion someone is using a wide screen monitor so the width will
            // be more than the height.
            top = "0px";

            // We'll use the available height.
            canvasDisplayHeight = screen.height.toString() + "px";

            // Now we'll calculate how much the width can be while maintaining
            // the aspect ratio.
            const fullscreenWidth = (screen.width * resizeFactor);
            canvasDisplayWidth = fullscreenWidth.toString() + "px";

            left = ((screen.width - fullscreenWidth) / 2).toString() + "px";
        }

        canvas.style.left = left;
        canvas.style.top = top;
        canvas.style.width = canvasDisplayWidth;
        canvas.style.height = canvasDisplayHeight;
        canvas.width = fullGameWidth;
        canvas.height = fullGameHeight;
    }
}
