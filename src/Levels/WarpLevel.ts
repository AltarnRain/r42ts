/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import { drawBackground, drawWarpBackground } from "../GameScreen/StaticRenders";
import ILevel from "../Interfaces/ILevel";
import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayerPositionToSpawnPosition, setPlayerMovementLimit } from "../State/Player/Actions";
import { dispatch, appStore, appState } from "../State/Store";
import Guard from "../Guard";
import Mutators from "../Utility/FrameMutators";
import { Frame } from "../Types";
import renderFrame from "../Render/RenderFrame";

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
} = dimensionProvider();

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

        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => this.drawWarpGate()));
    }

    private drawWarpGate(): void {
        const f: Frame = [
            []
        ];

        for (let i = 0; i < 16; i++) {
            f[0].push("E");
        }

        Mutators.Frame.convertHexToCGA(f);

        const {
            fullWidth,
            fullHeight,
            gameFieldTop
        } = dimensionProvider();
        const left = fullWidth / 2 - (16 * pixelSize) / 2;

        let top = fullHeight - pixelSize * 2;

        while (top > gameFieldTop + pixelSize) {
            renderFrame(left, top, f);
            top -= pixelSize;
        }
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