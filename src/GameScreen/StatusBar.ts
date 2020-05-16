/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import { getPlayerFrame } from "../Player/PlayerFrames";
import dimensionProvider from "../Providers/DimensionProvider";
import ctxProvider from "../Render/CtxProvider";
import renderFrame from "../Render/RenderFrame";
import getNumbers from "../SharedFrames/GetNumbers";
import { appState } from "../State/Store";
import { Frame } from "../Types";
import { getFrameByIndex, getFrameDimensions } from "../Utility/Frame";
import Mutators from "../Utility/FrameMutators";
import { padLeft } from "../Utility/String";

/**
 * Module:          StatusBar
 * Responsibility:  Drawn at the top of the screen for score, phasers, lives and level.
 */

const ctx = ctxProvider();

const {
    pixelSize,
    fullGameWidth
} = dimensionProvider();

const numberFrames = getNumbers(CGAColors.yellow);

const lifeFrame = getPlayerFrame();
Mutators.Frame.setColor(lifeFrame, CGAColors.yellow);

// Score constants
const scoreStartPosition = 4 * pixelSize;
const scoreSpacing = 2 * pixelSize;
const scoreBackgroundWidth = 45 * pixelSize;

// Phaser constants.
const phaserStartPosition = scoreBackgroundWidth;
const phaserSpacing = pixelSize * 2;
const phaserBackgroundWidth = pixelSize * 50;

// The phaser frame is only used in the status bar.
// no point in moving it to anther file.
const phaserFrame: Frame = [
    ["E", "0"],
    ["E", "0"],
    ["E", "E"],
    ["0", "E"],
    ["0", "E"],
];

Mutators.Frame.convertHexToCGA(phaserFrame);

// Lives constants.
const livesSpacing = 2 * pixelSize;
const lifeFrameWidth = getFrameDimensions(lifeFrame).width;

// Level number constants.
const leftNumberLeft = pixelSize * 148;
const rightNumberLeft = pixelSize * 154;
const scoreBoardHeight = pixelSize * 6;

/**
 * Main funtion that draw the entire status bar.
 */
export function drawStatusBar(): void {
    ctx.fillStyle = CGAColors.red;
    ctx.fillRect(0, 0, fullGameWidth, scoreBoardHeight);
    drawScore();
    drawPhasers();
    drawLives();
    drawLevel();
}

/**
 * Draw the level indicator.
 */
function drawScore(): void {
    const { gameState } = appState();
    const scoreString = padLeft(gameState.score.toString(), 6, "0");

    let cnt = 0;
    for (const n of scoreString) {
        const frame = getFrameByIndex(numberFrames, parseInt(n, 10));

        const actualSpacing = cnt === 0 ? 0 : scoreSpacing;
        let left = cnt * (getFrameDimensions(frame).width + actualSpacing);
        left = scoreStartPosition + left;
        renderFrame(left, 0, frame);
        cnt++;
    }
}

function drawPhasers(): void {
    const { gameState } = appState();

    const maxPhasersToBeDrawn = gameState.phasers < 11 ? gameState.phasers : 11;

    for (let i = 0; i < maxPhasersToBeDrawn; i++) {
        const actualSpacing = i === 0 ? 0 : phaserSpacing;
        const left = phaserStartPosition + i * pixelSize + i * actualSpacing;

        if (left <= phaserStartPosition + phaserBackgroundWidth) {
            renderFrame(left, 0, phaserFrame);
        }
    }
}

/**
 * Draws the player lives. These are drawn from right.
 */
function drawLives(): void {
    const { gameState } = appState();
    let left = 135 * pixelSize;

    const maxLivesToBeDrawn = gameState.lives <= 8 ? gameState.lives : 8;

    for (let lives = 1; lives <= maxLivesToBeDrawn; lives++) {
        renderFrame(left, pixelSize, lifeFrame);
        left -= livesSpacing + lifeFrameWidth;
    }
}

function drawLevel(): void {
    const { gameState } = appState();
    let paddedLevelString = "0";
    if (gameState.level !== undefined) {
        paddedLevelString = padLeft(gameState.level.toString(), 2, "0");
    }

    const rightNumber = parseInt(paddedLevelString[1], 10);
    const leftNumber = parseInt(paddedLevelString[0], 10);

    const rightFrame = getFrameByIndex(numberFrames, rightNumber);
    const leftFrame = getFrameByIndex(numberFrames, leftNumber);

    renderFrame(leftNumberLeft, 0, leftFrame);
    renderFrame(rightNumberLeft, 0, rightFrame);
}