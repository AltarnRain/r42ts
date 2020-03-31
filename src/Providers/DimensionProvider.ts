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

export default function DimensionProvider(node?: Node): GameDimensions {
    if (!gameDimensions) {

        let body: HTMLBodyElement;

        if (node) {
            body = node as HTMLBodyElement;
        } else {
            body = document.getElementById("body") as HTMLBodyElement;
        }

        if (!body) {
            throw new Error("No body element found.");
        }

        const rect = body.getBoundingClientRect();

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
            scoreBoardHeight,
            maxPixelSize,
            minPixelSize
        };
    }

    return gameDimensions;
}