/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import { drawBackground, drawWarpBackground } from "../GameScreen/StaticRenders";
import Guard from "../Guard";
import ILevel from "../Interfaces/ILevel";
import { GameRectangle } from "../Models/GameRectangle";
import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayerMovementLimit, setPlayerPositionToSpawnPosition } from "../State/Player/Actions";
import { appState, appStore, dispatch } from "../State/Store";
import { Frame } from "../Types";
import { randomNumberInRange } from "../Utility/Lib";
import WarpLevelConstants from "../Constants/WarpLevelConstants";

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

const {
    pixelSize,
    fullGameWidth,
    fullGameHeight
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

        const warpGateRecrds = this.calculateWarpGate(5);

        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => drawWarpBackground(additionalColor, warpGateRecrds)));

    }
    private calculateWarpGate(complexity: number): GameRectangle[] {

        let left = warpGateInitialleft;

        // We'll start at the bottom and draw up. This
        // allows me to ensure a safe position for the player to
        // enter the warp gate.
        let top = WarpLevelConstants.bottom;

        const safeZone: GameRectangle[] = [];

        // Step sizes determine the amount of game pixels that
        // the warp gate will move up and to the sides.
        const stepSizeY = 3 * pixelSize;
        const stepSizeX = 2 * pixelSize;

        while (top >= WarpLevelConstants.top) {

            const rect: GameRectangle = {
                left,
                top,
                right: left + pixelSize * 16,
                bottom: top + stepSizeY,
            };

            top -= stepSizeY;
            left -= stepSizeX;
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