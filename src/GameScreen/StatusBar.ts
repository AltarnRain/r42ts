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
import CtxProvider from "../Providers/CtxProvider";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { appState, appStore } from "../State/Store";
import { Frame } from "../Types/Types";
import { convertFrameColor, convertVariableFramesColor, getFrameByIndex, getFrameDimensions, setFrameColor } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { padLeft } from "../Utility/String";

const ctx = CtxProvider();

const {
    fullWidth,
    maxPixelSize,
    statusBarHeight
} = DimensionProvider();

const numberFrames = cloneObject(Numbers);
convertVariableFramesColor(numberFrames, CGAColors.yellow);

const lifeFrame = cloneObject(PlayerFrame);
setFrameColor(lifeFrame, CGAColors.yellow);

// Score constants
const scoreStartPosition = 4 * maxPixelSize;
const scoreSpacing = 2 * maxPixelSize;
const scoreBackgroundWidth = 46 * maxPixelSize;

// Phaser constants.
const phaserStartPosition = scoreBackgroundWidth;
const phaserSpacing = maxPixelSize * 2;
const phaserDrawLimit = 10;
const phaserBackgroundWidth = (phaserSpacing + maxPixelSize * 2) * (phaserDrawLimit - 1);

const phaserFrame: Frame = [
    ["E", "0"],
    ["E", "0"],
    ["E", "E"],
    ["0", "E"],
    ["0", "E"],
];

convertFrameColor(phaserFrame);

// Lives constants.
const livesDrawLimit = 7;
const livesSpacing = 2 * maxPixelSize;
const livesStartPostion = scoreBackgroundWidth + phaserBackgroundWidth;
const liveFrameWidth = getFrameDimensions(lifeFrame, maxPixelSize).width;
const livesBackgroundWidth = liveFrameWidth * livesDrawLimit + (livesSpacing * (livesDrawLimit - 1));

// Level number constants.
const levelStartPosition = scoreBackgroundWidth + phaserBackgroundWidth + livesBackgroundWidth;
const numberFrameWidth = getFrameDimensions(numberFrames.F0, maxPixelSize).width;
const leftNumberLeft = fullWidth - (numberFrameWidth * 2.5);
const rightNumberLeft = leftNumberLeft + numberFrameWidth + maxPixelSize;
const levelBackgroundWidth = fullWidth - levelStartPosition;

let reduxSubscription: () => void;

let currentScore: number | undefined;
let currentPhaserCount: number | undefined;
let currentLevel: number | undefined;
let currentLives: number | undefined;

export function subscribeToChanges(): void {
    currentScore = undefined;
    currentPhaserCount = undefined;
    currentLives = undefined;
    currentLevel = undefined;
    reduxSubscription = appStore().subscribe(() => {
        drawScore();
        drawPhasers();
        drawLives();
        drawLevel();
    });
}

export function desubscribeToChanges(): void {
    if (reduxSubscription) {
        reduxSubscription();
    }
}

/**
 * Draw the level indicator.
 */
function drawScore(): void {
    const { gameState } = appState();

    if (gameState.score !== currentScore) {
        currentScore = gameState.score;
        ctx.fillStyle = CGAColors.red;
        ctx.fillRect(0, 0, scoreBackgroundWidth, statusBarHeight);

        const scoreString = padLeft(gameState.score.toString(), 6, "0");

        let cnt = 0;
        for (const n of scoreString) {
            const frame = getFrameByIndex(numberFrames, parseInt(n, 10));

            const actualSpacing = cnt === 0 ? 0 : scoreSpacing;
            let left = cnt * (getFrameDimensions(frame, DimensionProvider().maxPixelSize).width + actualSpacing);
            left = scoreStartPosition + left;
            renderFrame({ left, top: 0 }, frame);
            cnt++;
        }
    }
}

function drawPhasers(): void {
    const { gameState } = appState();

    if (gameState.phasers !== currentPhaserCount) {
        currentPhaserCount = gameState.phasers;
        ctx.fillStyle = CGAColors.red;
        ctx.fillRect(phaserStartPosition, 0, phaserBackgroundWidth, statusBarHeight);

        for (let i = 0; i < gameState.phasers; i++) {
            const actualSpacing = i === 0 ? 0 : phaserSpacing;
            const left = phaserStartPosition + i * maxPixelSize + i * actualSpacing;
            if (i <= phaserDrawLimit) {
                renderFrame({
                    left,
                    top: 0
                }, phaserFrame);
            }
        }
    }
}

/**
 * Draws the player lives.
 */
function drawLives(): void {
    const { gameState } = appState();

    if (gameState.lives !== currentLives) {
        currentLives = gameState.lives;
        ctx.fillStyle = CGAColors.red;
        ctx.fillRect(livesStartPostion, 0, livesBackgroundWidth, statusBarHeight);

        let left = livesStartPostion;

        for (let lives = 1; lives <= livesDrawLimit; lives++) {
            if (lives <= gameState.lives) {
                renderFrame({ left, top: maxPixelSize }, lifeFrame);
                left += livesSpacing + liveFrameWidth;
            }
        }
    }
}

function drawLevel(): void {
    const { gameState } = appState();

    if (gameState.level !== currentLevel) {
        currentLevel = gameState.level;
        ctx.fillStyle = CGAColors.red;
        ctx.fillRect(levelStartPosition, 0, levelBackgroundWidth, statusBarHeight);

        const paddedLevelString = padLeft(gameState.level.toString(), 2, "0");

        const rightNumber = parseInt(paddedLevelString[1], 10);
        const leftNumber = parseInt(paddedLevelString[0], 10);

        const rightFrame = getFrameByIndex(numberFrames, rightNumber);
        const leftFrame = getFrameByIndex(numberFrames, leftNumber);

        renderFrame({
            left: leftNumberLeft, top: 0
        }, leftFrame);

        renderFrame({ left: rightNumberLeft, top: 0 }, rightFrame);
    }
}