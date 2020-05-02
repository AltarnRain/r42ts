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
import renderFrame from "../Render/RenderFrame";
import { setPlayerMovementLimit, setPlayerPositionToSpawnPosition } from "../State/Player/Actions";
import { appState, appStore, dispatch } from "../State/Store";
import { Frame } from "../Types";
import { randomNumberInRange } from "../Utility/Lib";

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

// The WarpGate frame is sixteen pixels wide.
const warpGateFrame: Frame = [
    [],
    []
];

// const warpGateColor = "#000000";
const warpGateColor = "#0000AA";

for (let i = 0; i < 16; i++) {
    warpGateFrame[0].push(warpGateColor);
    warpGateFrame[1].push(warpGateColor);
}
// This constants 'left' takes the width of the wrap gate corridor into consireration.
// Always start a warp game using this left so we ensure the player is aligned perfectly.
const warpGateInitialleft = fullGameWidth / 2 - (16 * pixelSize) / 2;
const doublePixel = pixelSize * 2;

const warpGateTopEndPosition = fullGameHeight - pixelSize * 18;
const warpGateTopStartPosition = warpGateTopEndPosition - pixelSize * 100;

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
        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => drawWarpBackground(additionalColor)));

        const warpGateRecrds = this.calculateWarpGate(5);

        // this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => {
        //     // warpGateRecrds.forEach((r) => renderFrame(r.left, r.top, warpGateFrame));
        // }));
    }
    private calculateWarpGate(complexity: number): GameRectangle[] {

        let left = warpGateInitialleft;
        let top = warpGateTopStartPosition;

        const safeZone: GameRectangle[] = [];

        while (top > warpGateTopEndPosition) {
            const rect: GameRectangle = {
                left,
                top,
                right: left + pixelSize * 16,
                bottom: top + pixelSize,
            };

            const a = randomNumberInRange(0, 1000);

            if (a < 100) {
                left -= doublePixel;
            } else if (a > 900) {
                left += doublePixel;
            }

            safeZone.push(rect);

            top -= doublePixel;
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