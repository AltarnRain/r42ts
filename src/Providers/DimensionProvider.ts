/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Dimension Provider
 * Responsibility:  Provide dimensions for game objects. Not a part of the State because the entire game uses it.
 */

import { ScoreBoardHeightFactor } from "../Constants/Constants";
import { GameDimensions } from "../Models/GameDimensions";

let gameDimensions: GameDimensions;

export default function DimensionProvider(node?: Node): GameDimensions  {
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

        const scoreBoardHeight = height * ScoreBoardHeightFactor;

        const gameFieldTop = scoreBoardHeight;
        const gameFieldHeight = height - gameFieldTop;

        const pixelSize = Math.ceil(width / 160);

        gameDimensions = {
            left: (window.innerWidth - width) / 2,
            fullWidth: width,
            fullHeight: height,
            gameFieldTop,
            gameFieldHeight,
            scoreBoardHeight,
            pixelSize,
        };
    }

    return gameDimensions;
}