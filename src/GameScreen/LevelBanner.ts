/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Characters from "../Assets/Characters";
import Numbers from "../Assets/Numbers";
import CGAColors from "../Constants/CGAColors";
import GameLocation from "../Models/GameLocation";
import CtxProvider from "../Providers/CtxProvider";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame } from "../Types/Types";
import { convertVariableFramesColor, getFrameByIndex, getFrameDimensions } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

/**
 * Module:          LevelBanner
 * Responsibility:  Shows the ROUND XX message before the level begins.
 */

const {
    fullHeight,
    fullWidth,
    maxPixelSize
} = DimensionProvider();

const ctx = CtxProvider();

const greenCharacters = cloneObject(Characters);
convertVariableFramesColor(greenCharacters, CGAColors.lightGreen);

const greenNumbers = cloneObject(Numbers);
convertVariableFramesColor(greenNumbers, CGAColors.lightGreen);

const roundCharacters = [
    greenCharacters.R,
    greenCharacters.O,
    greenCharacters.U,
    greenCharacters.N,
    greenCharacters.D,
];

const charStarPos = 0;

const {
    height,
    width
} = getFrameDimensions(Characters.R, maxPixelSize);

const charSpacing = maxPixelSize * 2;

export function drawLevelBanner(level: number): void {

    let levelNumberStartPos: number = 0;
    for (let i = 0; i < 5; i++) {
        const spacing = i === 0 ? 0 : charSpacing * i;
        const left = charStarPos + spacing + width * i;
        const location: GameLocation = {
            left,
            top: 0,
        };

        levelNumberStartPos = left;

        renderFrame(location, roundCharacters[i]);
    }

    levelNumberStartPos += width + charSpacing;

    let leftNumber: string | undefined;
    let rightNumber: string | undefined;

    let leftNumberFrame: Frame | undefined;
    let rightNumberFrame: Frame;

    const stringLevel = level.toString();

    const rightNumberPosition = levelNumberStartPos + width + charSpacing;

    if (level >= 10) {
        leftNumber = stringLevel[0];
        rightNumber = stringLevel[1];

        leftNumberFrame = getFrameByIndex(greenNumbers, parseInt(leftNumber, 10));
        rightNumberFrame = getFrameByIndex(greenNumbers, parseInt(rightNumber, 10));

    } else {
        rightNumber = stringLevel;
        rightNumberFrame = getFrameByIndex(greenNumbers, parseInt(rightNumber, 10));
    }

    // Render the left number if it's available.
    if (leftNumber && leftNumberFrame) {
        renderFrame({
            left: levelNumberStartPos,
            top: 0,
        }, leftNumberFrame);
    }

    // Always render the right number.
    renderFrame({
        left: rightNumberPosition,
        top: 0,
    }, rightNumberFrame);
}
