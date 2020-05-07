/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors, { validColors } from "../Constants/CGAColors";
import WarpLevelConstants from "../Constants/WarpLevelConstants";
import GameLoop from "../GameLoop";
import { drawBackground, drawWarpBackground } from "../GameScreen/StaticRenders";
import ILevel from "../Interfaces/ILevel";
import { GameRectangle } from "../Models/GameRectangle";
import dimensionProvider from "../Providers/DimensionProvider";
import { setWarpGamteComplexity } from "../State/Game/GameActions";
import { setPlayerMovementLimit } from "../State/Player/PlayerActions";
import { appState, appStore, dispatch } from "../State/Store";
import { getRandomArrayElement } from "../Utility/Array";
import { coinFlip } from "../Utility/Lib";
import { playerBulletSpeed } from "../Constants/BulletSpeeds";
import ctxProvider from "../Providers/CtxProvider";
import { overlaps } from "../Utility/Geometry";
import { fallsWithin } from "../Utility/Location";
import { DEBUGGING_drawGameRect } from "../Debugging/Debugging";

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

        // Check when the player is alive and set its movement limit to force up to force
        // the player to traverse the warp level.
        // I'm doing this in a subscription because the PlayerSpawnManager will
        // set a movement limit on the player depending on the game state.
        if (playerState.alive && playerState.moveLimit !== "none") {
            dispatch(setPlayerMovementLimit("none"));
        }
    });

    public start(): void {

        // Register the background draw function so it runs in the game loop.
        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(drawBackground));

        // Determine which additional color next to white the warp background will have.
        const colorIndex = Math.ceil(Math.random() * backgroundColor.length - 1);
        const additionalColor = backgroundColor[colorIndex];

        dispatch(setWarpGamteComplexity(8));

        const {
            gameState
        } = appState();

        const warpGate = this.calculateWarpGate(gameField.left, gameField.right, gameState.warpLevelSteps.stepsX, gameState.warpLevelSteps.stepsY);
        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => drawWarpBackground(additionalColor, warpGate)));
        this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => this.hitDetection(warpGate)));
    }

    private hitDetection(warpGate: GameRectangle[]): void {
        const { hitbox, alive } = appState().playerState;

        const ctx = ctxProvider();
        if (alive && hitbox !== undefined) {

            // // First we get a list of the save zones the player is in.
            // const currentSafeZones = warpGate
            //     .filter((wg) => overlaps(wg, hitbox))
            //     .sort((a, b) => a.top < b.top ? -1 : 1);

            // const partialHitboxes = currentSafeZones.map<{ hitbox: GameRectangle; safeSonze: GameRectangle }>((sz) => {

            //     const topDiff = hitbox.top + (sz.top - hitbox.top);
            //     const bottomDiff = hitbox.bottom + (sz.bottom - hitbox.bottom);

            //     return {
            //         hitbox: {
            //             left: hitbox.left,
            //             top: topDiff,
            //             bottom: bottomDiff,
            //             right: hitbox.right,
            //         },
            //         safeSonze: sz,
            //     };
            // });

            // const safe = partialHitboxes.every((ph) => fallsWithin(hitbox.left, hitbox.right, hitbox.top, hitbox.bottom, ph.safeSonze.left, ph.safeSonze.right, ph.safeSonze.top, ph.safeSonze.bottom));

            // currentSafeZones.forEach((r, index) => {
            //     ctx.fillStyle = validColors[index];
            //     ctx.fillRect(r.left, r.top, r.right - r.left, r.bottom - r.top);
            // });

            // if (safe === false) {
            //     DEBUGGING_drawGameRect(hitbox, "red", 5);
            // }

            // partialHitboxes.forEach((r) => {
            //     DEBUGGING_drawGameRect(r.hitbox, CGAColors.lightMagenta);
            // });

            const badSpace = warpGate
                .map((wg) => {
                    return {
                        left: {
                            left: gameField.left,
                            right: wg.left,
                            top: wg.top,
                            bottom: wg.bottom,
                        },
                        right: {
                            left: wg.right,
                            right: gameField.right,
                            top: wg.top,
                            bottom: wg.bottom,
                        },
                    };
                });

            badSpace.forEach((bs) => {
                DEBUGGING_drawGameRect(bs.left, "red");
                DEBUGGING_drawGameRect(bs.right, "red");
            });

            const dead = badSpace.some((sb) => {
                const { left: leftDanger, right: rightDanger } = sb;
                return fallsWithin(hitbox.left, hitbox.right, hitbox.top, hitbox.bottom, leftDanger.left, leftDanger.right, leftDanger.top, leftDanger.bottom) ||
                    fallsWithin(hitbox.left, hitbox.right, hitbox.top, hitbox.bottom, rightDanger.left, rightDanger.right, rightDanger.top, rightDanger.bottom);
            });

            if (dead) {
                DEBUGGING_drawGameRect(hitbox, "red", 5);
            }
        }
    }

    private calculateWarpGate(outerLeft: number, outerRight: number, stepSizesX: number[], stepSizesY: number[]): GameRectangle[] {

        const safeZone: GameRectangle[] = [];

        let direction = warpGateInitialleft;

        // We'll start at the bottom and draw up. This
        // allows me to ensure a safe position for the player to
        // enter the warp gate.
        let bottom = WarpLevelConstants.bottom;

        const pixelsToGo = WarpLevelConstants.heightPixelCount;
        let pixelsToDo = 0;

        let stepSizeY = getRandomArrayElement(stepSizesY);
        let stepSizeX = getRandomArrayElement(stepSizesX);

        while (pixelsToDo + stepSizeY < pixelsToGo) {
            const up = stepSizeY * pixelSize;

            const rect: GameRectangle = {
                left: direction,
                top: bottom - up,
                right: direction + WarpLevelConstants.width, // aka the width
                bottom, // aka the height.
            };

            // New left
            const verticalMove = stepSizeX * pixelSize;

            // 50/50 change that the warp gate goes left or right.
            const leftOrRight = coinFlip();
            if (leftOrRight) {
                // Left
                direction -= verticalMove;
            } else {
                // Right
                direction += verticalMove;
            }

            // Prevent the warp gate from going off screen by fliping the direction.
            if (direction <= outerLeft || direction + WarpLevelConstants.width >= outerRight) {
                direction *= -1;
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
                left: direction,
                top: WarpLevelConstants.top,
                right: direction + WarpLevelConstants.width,
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