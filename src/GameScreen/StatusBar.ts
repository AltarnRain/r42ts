/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StatusBar
 * Responsibility:  Drawn at the top of the screen for score, phasers, lives and level.
 */

import Numbers from "../Assets/Numbers";
import CGAColors from "../Constants/CGAColors";
import { PlayerFrame } from "../Player/PlayerFrames";
import ctxProvider from "../Providers/CtxProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { appState, appStore } from "../State/Store";
import { Frame } from "../Types/Types";
import { convertFrameColor, convertVariableFramesColor, getFrameByIndex, getFrameDimensions, setFrameColor } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { padLeft } from "../Utility/String";

const ctx = ctxProvider();

const {
    fullWidth,
    statusBarHeight,
    minPixelSize
} = dimensionProvider();

const numberFramesClone = cloneObject(Numbers);
convertVariableFramesColor(numberFramesClone, CGAColors.yellow);

const lifeFrameClone = cloneObject(PlayerFrame);
setFrameColor(lifeFrameClone, CGAColors.yellow);

// Score constants
const scoreStartPosition = 4 * minPixelSize;
const scoreSpacing = 2 * minPixelSize;
const scoreBackgroundWidth = 42 * minPixelSize;

// Phaser constants.
const phaserStartPosition = scoreBackgroundWidth;
const phaserSpacing = minPixelSize * 2;
const phaserBackgroundWidth = minPixelSize * 54;

const phaserFrame: Frame = [
    ["E", "0"],
    ["E", "0"],
    ["E", "E"],
    ["0", "E"],
    ["0", "E"],
];

convertFrameColor(phaserFrame);

// Lives constants.
const livesSpacing = 2 * minPixelSize;
const livesStartPostion = scoreBackgroundWidth + phaserBackgroundWidth;
const liveFrameWidth = getFrameDimensions(lifeFrameClone, minPixelSize).width;
const livesBackgroundWidth = minPixelSize * 54;

// Level number constants.
const levelStartPosition = scoreBackgroundWidth + phaserBackgroundWidth + livesBackgroundWidth;
const numberFrameWidth = getFrameDimensions(numberFramesClone[0], minPixelSize).width;
const leftNumberLeft = fullWidth - (numberFrameWidth * 2.5);
const rightNumberLeft = leftNumberLeft + numberFrameWidth + minPixelSize;
const levelBackgroundWidth = fullWidth - levelStartPosition;

/**
 * Main funtion that draw the entire status bar.
 */
export function drawStatusBar(): void {
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

    ctx.fillStyle = CGAColors.red;
    ctx.fillRect(0, 0, scoreBackgroundWidth, statusBarHeight);

    const scoreString = padLeft(gameState.score.toString(), 6, "0");

    let cnt = 0;
    for (const n of scoreString) {
        const frame = getFrameByIndex(numberFramesClone, parseInt(n, 10));

        const actualSpacing = cnt === 0 ? 0 : scoreSpacing;
        let left = cnt * (getFrameDimensions(frame, minPixelSize).width + actualSpacing);
        left = scoreStartPosition + left;
        renderFrame({ left, top: 0 }, frame);
        cnt++;
    }

}

function drawPhasers(): void {
    const { gameState } = appState();

    ctx.fillStyle = CGAColors.red;
    ctx.fillRect(phaserStartPosition, 0, phaserBackgroundWidth, statusBarHeight);

    for (let i = 0; i < gameState.phasers; i++) {
        const actualSpacing = i === 0 ? 0 : phaserSpacing;
        const left = phaserStartPosition + i * minPixelSize + i * actualSpacing;

        if (left <= phaserStartPosition + phaserBackgroundWidth) {
            renderFrame({
                left,
                top: 0
            }, phaserFrame);
        }
    }
}

/**
 * Draws the player lives. These are drawn from right.
 */
function drawLives(): void {
    const { gameState } = appState();

    ctx.fillStyle = CGAColors.red;
    ctx.fillRect(livesStartPostion, 0, livesBackgroundWidth, statusBarHeight);

    let left = livesStartPostion + livesBackgroundWidth - liveFrameWidth;

    for (let lives = 1; lives <= gameState.lives; lives++) {
        if (left >= livesStartPostion) {
            renderFrame({ left, top: minPixelSize }, lifeFrameClone);
            left -= livesSpacing + liveFrameWidth;
        }
    }
}

function drawLevel(): void {
    const { gameState } = appState();

    ctx.fillStyle = CGAColors.red;
    ctx.fillRect(levelStartPosition, 0, levelBackgroundWidth, statusBarHeight);

    const paddedLevelString = padLeft(gameState.level.toString(), 2, "0");

    const rightNumber = parseInt(paddedLevelString[1], 10);
    const leftNumber = parseInt(paddedLevelString[0], 10);

    const rightFrame = getFrameByIndex(numberFramesClone, rightNumber);
    const leftFrame = getFrameByIndex(numberFramesClone, leftNumber);

    renderFrame({
        left: leftNumberLeft, top: 0
    }, leftFrame);

    renderFrame({ left: rightNumberLeft, top: 0 }, rightFrame);
}