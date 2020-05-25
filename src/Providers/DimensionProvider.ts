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

        const fullscreen = rect.width === screen.width && rect.height === screen.height;

        let pixelSize = 0;
        if (rect.width < rect.height) {
            pixelSize = Math.floor(rect.width / 160);
        } else {
            pixelSize = Math.floor(rect.height / 100);
        }

        const fullGameHeight = pixelSize * 100;
        const fullGameWidth = pixelSize * 160;

        const canvasLeft = (rect.width - fullGameWidth) / 2;
        const canvasTop = (rect.height - fullGameHeight) / 2;

        const statusBarBottom = pixelSize * 6;

        const gameFieldLeft = pixelSize;
        const gameFieldRight = fullGameWidth - pixelSize;
        const gameFieldTop = statusBarBottom + pixelSize;
        const gameFieldBottom = fullGameHeight - pixelSize;

        const gameFieldWidth = gameFieldRight - gameFieldLeft;
        const gameFieldHeight = gameFieldBottom - gameFieldTop;

        gameDimensions = {
            fullGameWidth,
            fullGameHeight,
            statusBarBottom,
            pixelSize,
            pixelSize2x: pixelSize * 2,
            gameField: {
                left: gameFieldLeft,
                top: gameFieldTop,
                right: gameFieldRight,
                bottom: gameFieldBottom,
                width: gameFieldWidth,
                height: gameFieldHeight,
            },
            canvasLeft,
            canvasTop,
            fullscreen,
        };
    }

    return gameDimensions;
}