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

const {
    width
} = getFrameDimensions(Characters.R, maxPixelSize);

const top = fullHeight * 0.25;
const left = maxPixelSize * 22;
const barwidth = maxPixelSize * 30;
const roundWidth = 76 * maxPixelSize;
const charSpacing = maxPixelSize * 2;

export function drawLevelBannerWithTimeout(level: number, timeout: number, callback: () => void): void {
    drawLevelBanner(level);
    window.setTimeout(() => {
        callback();
    }, timeout);
}

export function drawLevelBanner(level: number): void {

    let barcolor: string;
    let bartop = top;
    for (let i = 0; i < 3; i++) {
        if (i % 2 === 0) {
            barcolor = CGAColors.red;
        } else {
            barcolor = CGAColors.brown;
        }

        ctx.fillStyle = barcolor;
        ctx.fillRect(left, bartop, barwidth, maxPixelSize);
        ctx.fillRect(left + roundWidth, bartop, barwidth, maxPixelSize);

        bartop += maxPixelSize * 2;
    }

    let levelNumberStartPos: number = 0;
    for (let i = 0; i < 5; i++) {
        const spacing = i === 0 ? 0 : charSpacing * i;
        const charLeft = left + barwidth + charSpacing * 2 + spacing + width * i;
        const location: GameLocation = {
            left: charLeft,
            top,
        };

        levelNumberStartPos = charLeft;

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
            top,
        }, leftNumberFrame);
    }

    // Always render the right number.
    renderFrame({
        left: rightNumberPosition,
        top,
    }, rightNumberFrame);
}
