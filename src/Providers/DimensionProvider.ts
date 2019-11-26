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
import { GameDimensions } from "../Interfaces/GameDimensions";

let gameDimensions: GameDimensions;

const DimensionProvider = (): GameDimensions => {
    if (!gameDimensions) {
        const height = window.innerHeight * 0.98;
        const width = (height / 3) * 4;

        const scoreBoardHeight = height * ScoreBoardHeightFactor;

        const gameFieldTop = scoreBoardHeight;
        const gameFieldHeight = height - gameFieldTop;

        const pixelSize = width / 160;

        gameDimensions = {
            left: (window.innerWidth - width) / 2,
            width,
            gameFieldTop,
            gameFieldHeight,
            scoreBoardHeight,
            pixelSize,
        };
    }

    return gameDimensions;
};

export default DimensionProvider;