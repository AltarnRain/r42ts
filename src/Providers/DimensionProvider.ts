/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Dimension Provider
 * Responsibility:  Provide dimensions for game objects. Not a part of the State because the entire game uses it.
 */

import { GameDimensions } from "../Models/GameDimensions";

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
            rect = { height : 1024 } as DOMRect;
        } else {
            rect = body.getBoundingClientRect();
        }

        // r42 uses a 4:3 resolution.
        const height = rect.height;
        const width = (height / 3) * 4;

        const maxPixelSize = Math.ceil(width / 160);
        const minPixelSize = Math.floor(width / 160);

        const scoreBoardHeight = maxPixelSize * 6;

        const gameFieldTop = scoreBoardHeight;
        const gameFieldHeight = height - gameFieldTop;

        gameDimensions = {
            fullWidth: width,
            fullHeight: height,
            gameFieldTop,
            gameFieldHeight,
            statusBarHeight: scoreBoardHeight,
            maxPixelSize,
            minPixelSize,
            averagePixelSize: (maxPixelSize + minPixelSize) / 2,
        };
    }

    return gameDimensions;
}