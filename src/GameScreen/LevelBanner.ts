/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import dimensionProvider from "../Providers/DimensionProvider";
import ctxProvider from "../Providers/Render/CtxProvider";
import renderFrame from "../Render/RenderFrame";
import getCharacters from "../SharedFrames/Characters";
import getNumbers from "../SharedFrames/Numbers";
import { Frame } from "../Types";
import { getFrameByIndex, getFrameDimensions } from "../Utility/Frame";
import getCharacter from "../Utility/getCharacter";

/**
 * Module:          LevelBanner
 * Responsibility:  Shows the ROUND XX message before the level begins.
 */

const {
    pixelSize,
    gameField
} = dimensionProvider();

const ctx = ctxProvider();

const greenCharacters = getCharacters(CGAColors.lightGreen);
const greenNumbers = getNumbers(CGAColors.lightGreen);

const roundCharacters = [
    getCharacter(greenCharacters, "R"),
    getCharacter(greenCharacters, "O"),
    getCharacter(greenCharacters, "U"),
    getCharacter(greenCharacters, "N"),
    getCharacter(greenCharacters, "D"),
];

const {
    width
} = getFrameDimensions(roundCharacters[0]);

const top = gameField.bottom * 0.33;
const left = pixelSize * 26;
const barwidth = pixelSize * 30;
const roundWidth = 76 * pixelSize;
const charSpacing = pixelSize * 2;

export function drawLevelBanner(level: number | undefined, start: () => void): void {

    let levelNumber = 0;
    if (level !== undefined) {
        levelNumber = level;
    }

    const sub = GameLoop.registerBackgroundDrawing(() => draw(levelNumber));

    // Draw the level banner for 1 second. The use the callback to signal the called something else
    // can now be done.
    window.setTimeout(() => {
        sub();
        start();
    }, 1000);
}

/**
 * Draws the level banner for the passed level.
 * @param {number} level. Level the level banner should show.
 */
function draw(level: number): void {
    let barcolor: string;
    let bartop = top;
    for (let i = 0; i < 3; i++) {
        if (i % 2 === 0) {
            barcolor = CGAColors.red;
        } else {
            barcolor = CGAColors.brown;
        }

        ctx.fillStyle = barcolor;
        ctx.fillRect(left, bartop, barwidth, pixelSize);
        ctx.fillRect(left + roundWidth, bartop, barwidth, pixelSize);

        bartop += pixelSize * 2;
    }

    let levelNumberStartPos: number = 0;
    for (let i = 0; i < 5; i++) {
        const spacing = i === 0 ? 0 : charSpacing * i;
        const charLeft = left + barwidth + charSpacing * 2 + spacing + width * i;

        levelNumberStartPos = charLeft;

        renderFrame(charLeft, top, roundCharacters[i]);
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
        renderFrame(levelNumberStartPos, top, leftNumberFrame);
    }

    // Always render the right number.
    renderFrame(rightNumberPosition, top, rightNumberFrame);
}
