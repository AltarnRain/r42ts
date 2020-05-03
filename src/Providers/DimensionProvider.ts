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
        const pixelSize = Math.floor(rect.height / 100);

        const fullGameHeight = pixelSize * 100;
        const fullGameWidth = pixelSize * 160;

        const statusBarBottom = pixelSize * 6;

        gameDimensions = {
            fullGameWidth,
            fullGameHeight,
            statusBarBottom,
            pixelSize,
            pixelSize2x: pixelSize * 2,
            gameField: {
                left: pixelSize,
                top: statusBarBottom + pixelSize,
                right: fullGameWidth - pixelSize,
                bottom: fullGameHeight - pixelSize,
            }
        };
    }

    return gameDimensions;
}