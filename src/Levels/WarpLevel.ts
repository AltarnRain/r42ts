/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import WarpLevelConstants from "../Constants/WarpLevelConstants";
import GameLoop from "../GameLoop";
import { drawBackground, drawWarpBackground } from "../GameScreen/StaticRenders";
import Guard from "../Guard";
import ILevel from "../Interfaces/ILevel";
import { GameRectangle } from "../Models/GameRectangle";
import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayerMovementLimit, setPlayerPositionToSpawnPosition } from "../State/Player/Actions";
import { appState, appStore, dispatch } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { coinFlip } from "../Utility/Lib";

/**
 * Module:          WarpLevel
 * Responsibility:  Warp level for the player to pass though.
 */

const backgroundColor: string[] = [
    CGAColors.brown,
    CGAColors.green,
    CGAColors.magenta,
    CGAColors.blue,
];

export const warpLevelComplexities = [
    [
        [0, 2, 2, 4], [4, 4, 6, 8], // level 4,
        [0, 2, 2, 4], [4, 4, 6, 6], // Level 8
        [0, 2, 2, 4], [4, 4, 4, 6], // Level 12,
        [2, 2, 4, 4], [2, 4, 4, 6], // Level 16
        [2, 2, 2, 4], [2, 2, 4], // Level 24,
        [2, 2, 4, 4], [2, 4], // Level 28,
        [2, 2, 4, 4], [2], // Level 32,
        [2, 2, 4], [2], // Level 36 +
    ]
];

const {
    pixelSize,
    fullGameWidth,
    gameField
} = dimensionProvider();

// This constants 'left' takes the width of the wrap gate corridor into consireration.
// Always start a warp game using this left so we ensure the player is aligned perfectly.
const warpGateInitialleft = fullGameWidth / 2 - (16 * pixelSize) / 2;

export default class WarpLevel implements ILevel {

    private gameLoopSubscriptions: Array<(tick?: number) => void> = [];

    /**
     * Store the movement restriction to force up
     */
    private storeSub = appStore().subscribe(() => {
        const { playerState } = appState();

        if (Guard.isPlayerAlive(playerState.ship) && playerState.moveLimit !== "none") {
            dispatch(setPlayerMovementLimit("none"));
        }
    });

    public start(): void {

        dispatch(setPlayerPositionToSpawnPosition());

        // Register the background draw function so it runs in the game loop.
        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(drawBackground));

        // Determine which additional color next to white the warp background will have.
        const colorIndex = Math.ceil(Math.random() * backgroundColor.length - 1);
        const additionalColor = backgroundColor[colorIndex];

        const warpGate = this.calculateWarpGate(gameField.left, gameField.right, [4], [2]);

        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => drawWarpBackground(additionalColor, warpGate)));
    }

    private calculateWarpGate(outerLeft: number, outerRight: number, stepSizesX: number[], stepSizesY: number[]): GameRectangle[] {

        let left = warpGateInitialleft;

        // We'll start at the bottom and draw up. This
        // allows me to ensure a safe position for the player to
        // enter the warp gate.
        let bottom = WarpLevelConstants.bottom;

        const pixelsToGo = WarpLevelConstants.heightPixelCount;
        let pixelsToDo = 0;

        const safeZone: GameRectangle[] = [];

        let stepSizeY = getRandomArrayElement(stepSizesY);
        let stepSizeX = getRandomArrayElement(stepSizesX);

        while (pixelsToDo + stepSizeY < pixelsToGo) {
            const up = stepSizeY * pixelSize;

            const rect: GameRectangle = {
                left,
                top: bottom - up,
                right: left + WarpLevelConstants.width,
                bottom,
            };

            // New left
            const verticalMove = stepSizeX * pixelSize;

            // 50/50 change that the warp gate goes left or right.
            const direction = coinFlip();
            if (direction) {
                left -= verticalMove;
            } else {
                left += verticalMove;
            }

            // Prevent the warp gate from going off screen.
            if (left <= outerLeft) {
                left += verticalMove;
            } else if (left + WarpLevelConstants.width >= outerRight) {
                left -= verticalMove;
            }

            // bottom moves up.
            bottom -= up;

            // Reduce pixels to do.
            pixelsToDo += stepSizeY;
            safeZone.push(rect);

            stepSizeY = getRandomArrayElement(stepSizesY);
            stepSizeX = getRandomArrayElement(stepSizesX);
        }

        // Deal with some left over space
        if (pixelsToDo !== 0) {
            const rect: GameRectangle = {
                left,
                top: WarpLevelConstants.top,
                right: left + WarpLevelConstants.width,
                bottom
            };

            safeZone.push(rect);
        }

        return safeZone;
    }

    /**
     * Dispose stuff.
     */
    public dispose(): void {
        // Dispose all game loop subscriptions.
        this.gameLoopSubscriptions.forEach((s) => s());
        this.storeSub();
    }
}