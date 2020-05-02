/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameDimensions } from "../Models/GameDimensions";

/**
 * Module:          Dimension Provider
 * Responsibility:  Provide dimensions for game objects. Not a part of the State because the entire game uses it.
 */

let gameDimensions: GameDimensions;

/**
 * dimensionProvider. Single function responsible for all dimensions important to the game.
 * @param {Node} node. Node
 * @returns {GameDimensions}. An object with dimensions.
 */
export default function dimensionProvider(): GameDimensions {
    if (!gameDimensions) {

        const body = document.getElementById("body") as HTMLBodyElement;

        let rect: DOMRect;
        if (!body) {
            // Not a nice solution, but the dimensionProvider is called from within unit tests and I do not want
            // to add elements.
            rect = { height: 1024 } as DOMRect;
        } else {
            rect = body.getBoundingClientRect();
        }

        // r42 uses a 4:3 resolution.
        const canvasHeight = rect.height;
        const canvasWidth = (canvasHeight / 3) * 4;

        // Round pixel size. This is VERY important for canvas rendering.
        // When a decimal number is rendered by the canvas you get blurry sides.
        const pixelSize = Math.round(canvasWidth / 160);

        const fullGameHeight = pixelSize * 120;
        const fullGameWidth = pixelSize * 160;

        const statusBarHeight = pixelSize * 6;

        // Add one pixel to accomodate the border around the game field.
        const gameFieldTop = statusBarHeight + pixelSize * 2;

        const gameFieldHeight = fullGameHeight - pixelSize;

        gameDimensions = {
            fullGameWidth,
            fullGameHeight,
            gameFieldTop,
            gameFieldHeight,
            statusBarHeight,
            pixelSize,
            pixelSize2x: pixelSize * 2,
            gameFieldLeft: pixelSize,
            gameFieldWidth: fullGameWidth - pixelSize,
        };
    }

    return gameDimensions;
}