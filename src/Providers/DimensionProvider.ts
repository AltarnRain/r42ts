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

let gameDimensions: GameDimensions | undefined;

/**
 * dimensionProvider. Single function responsible for all dimensions important to the game.
 * @param {Node} node. Node
 * @returns {GameDimensions}. An object with dimensions.
 */
export default function dimensionProvider(): GameDimensions {
    if (!gameDimensions) {

        const body = document.getElementById("body") as HTMLBodyElement;
        if (!body) {
            throw new Error("Could not find a body element");
        }

        const rect = body.getBoundingClientRect();

        const fullscreen = rect.width === screen.width && rect.height === screen.height;

        const pixelSize = 10;
        const fullGameHeight = 1000;
        const fullGameWidth = 1600;

        const resizeFactor = rect.height < rect.width ? rect.height / fullGameHeight : rect.width / fullGameWidth;

        const canvasWidth = fullGameWidth * resizeFactor;
        const canvasHeight = fullGameHeight * resizeFactor;

        const canvasLeft = (rect.width - canvasWidth) / 2;
        const canvasTop = fullscreen ? 0 : (rect.height - canvasHeight) / 2;

        const statusBarBottom = pixelSize * 6;

        gameDimensions = {
            fullGameWidth,
            fullGameHeight,
            statusBarBottom,
            pixelSize,
            pixelSize2x: pixelSize * 2,
            // The game field is bordered by a rectangle with a thickness of 1 pixelSize.
            gameField: {
                left: pixelSize,
                right: fullGameWidth - pixelSize,
                top: statusBarBottom + pixelSize,
                bottom: fullGameHeight - pixelSize,
                width: fullGameWidth - pixelSize * 2,
                height: fullGameHeight - statusBarBottom,
            },
            canvasDimensions: {
                left: canvasLeft,
                top: canvasTop,
                displayWidth: canvasWidth,
                displayHeight: canvasHeight,
            }
        };
    }

    return gameDimensions;
}

/**
 * Sets the gameDimension module variable to undefined.
 * This triggers the dimension Provider to recalculate the game dimensions.
 */
export function resetGameDimensions(): void {
    gameDimensions = undefined;
}