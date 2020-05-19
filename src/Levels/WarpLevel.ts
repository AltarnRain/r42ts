/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import { Locations, Points, WarpLevelConstants } from "../Constants/Constants";
import { DEBUGGING_drawGameRect } from "../Debugging/Debugging";
import GameLoop from "../GameLoop";
import drawLevelBanner from "../GameScreen/LevelBanner";
import { drawBackground, drawWarpBackground } from "../GameScreen/StaticRenders";
import Guard from "../Guard";
import ILevel from "../Interfaces/ILevel";
import { GameRectangle } from "../Models/GameRectangle";
import dimensionProvider from "../Providers/DimensionProvider";
import { SoundPlayer } from "../Sound/SoundPlayer";
import { increaseScore } from "../State/Game/GameActions";
import { setPlayerLocationData, setPlayerMovementLimit } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import handleLevelWon from "../StateHandlers/HandleLevelWon";
import handlePlayerDeath from "../StateHandlers/HandlePlayerDeath";
import { getRandomArrayElement } from "../Utility/Array";
import { coinFlip } from "../Utility/Lib";
import { fallsWithin } from "../Utility/Location";

/**
 * Module:          WarpLevel
 * Responsibility:  Warp level for the player to pass though.
 */

// The colors used alternate between white and something else for background drawing.
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

    /**
     * An array of game loop subscriptions.
     */
    private gameLoopSubscriptions: Array<(tick?: number) => void> = [];

    /**
     * Start the level. Required by contract.
     */
    public begin(): Promise<void> {

        return new Promise((resolve) => {
            dispatch(setPlayerMovementLimit("immobile"));
            dispatch(setPlayerLocationData(Locations.Player.spawnLocation.left, Locations.Player.spawnLocation.top));

            // Register the background draw function so it runs in the game loop.
            this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(drawBackground));

            // Determine which additional color next to white the warp background will have.
            const colorIndex = Math.ceil(Math.random() * backgroundColor.length - 1);
            const additionalColor = backgroundColor[colorIndex];

            const {
                gameState
            } = appState();

            // Show the level banner for this warp gate levels. Warp gates show the level banner BEFORE the back ground
            // is drawn otherwise the level banner is impossible to read.
            drawLevelBanner(gameState.level, () => {
                // Generate the warpgate so we can draw a path and calculate the hitboxes of the adjecent walls. The complexity of the
                // warp gate is taken from the GameState, the WarpGate class hasn't a clue how complicated the gate will be.
                const warpGate = this.calculateWarpGate(gameField.left, gameField.right, gameState.warpLevelSteps.stepsX, gameState.warpLevelSteps.stepsY);
                const badSpace = this.getWallHitboxes(warpGate);

                // Banner is gone, time to draw the background of the warp gate background and path.
                this.gameLoopSubscriptions.push(GameLoop.registerBackgroundDrawing(() => drawWarpBackground(additionalColor, warpGate)));

                // Add a function to the GameLoop that will check if a level has been won.
                this.gameLoopSubscriptions.push(GameLoop.registerLevelWonMonitor(() => this.monitorLevelWon()));

                // Add a function to the GameLoop that checks if the player has reached the end of the warp gate. This will
                // trigger progression to the next level.
                this.gameLoopSubscriptions.push(GameLoop.registerUpdateState((tick) => this.hitDetection(tick, badSpace)));

                // Register a sound runner.
                this.gameLoopSubscriptions.push(GameLoop.registerSoundRunner(() => this.soundRunner()));

                // Allow the player to see the warp level for 1 second before forcing thm to travel it.
                window.setTimeout(() => {
                    dispatch(setPlayerMovementLimit("forceup"));

                    // Initialize the warp level background sound.
                    SoundPlayer.playTravelingWarpGate();

                    resolve();
                }, 1000)
            });
        });
    }

    /**
     * Monitors if the warp travel should should be played or not.
     */
    private soundRunner(): void {
        const {
            playerState: { alive }
        } = appState();

        // Only play the warp travel sound when the player is alive.
        if (alive) {
            SoundPlayer.ensureBackground();
        } else {
            SoundPlayer.stopBackground();
        }
    }

    /**
     * Get the warp gate's wall hitboxes derived from the warpgate.
     * @param {GameRectangle[]} warpGate. Hitboxes for the walls.
     */
    private getWallHitboxes(warpGate: GameRectangle[]): Array<{ left: GameRectangle, right: GameRectangle }> {
        return warpGate
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
    }

    /**
     * Detect if a player hit a wall.
     * @param {number} tick. Current tick.
     * @param {BadSpace} badSpace. Where not to go.
     */
    private hitDetection(tick: number, badSpace: Array<{ left: GameRectangle; right: GameRectangle }>): void {
        const { playerState, debuggingState } = appState();
        if (!Guard.isPlayerAlive(playerState)) {
            return;
        }

        const { hitboxes, alive } = playerState;

        const hitside = badSpace.some((sb) => {
            const { left: leftDanger, right: rightDanger } = sb;
            const { middle, bottom } = hitboxes;

            return fallsWithin(bottom.left, bottom.right, bottom.top, bottom.bottom, leftDanger.left, leftDanger.right, leftDanger.top, leftDanger.bottom) ||
                fallsWithin(bottom.left, bottom.right, bottom.top, bottom.bottom, rightDanger.left, rightDanger.right, rightDanger.top, rightDanger.bottom) ||
                fallsWithin(middle.left, middle.right, middle.top, middle.bottom, leftDanger.left, leftDanger.right, leftDanger.top, leftDanger.bottom) ||
                fallsWithin(middle.left, middle.right, middle.top, middle.bottom, rightDanger.left, rightDanger.right, rightDanger.top, rightDanger.bottom);
        });

        if (hitside && alive) {
            // You dead bro.
            handlePlayerDeath(tick);
        }

        if (debuggingState.drawHitboxes) {
            badSpace.forEach((bs) => {
                GameLoop.registerDraw(() => DEBUGGING_drawGameRect(bs.left, "red"));
                GameLoop.registerDraw(() => DEBUGGING_drawGameRect(bs.right, "red"));
            });
        }
    }

    /**
     * Checks if the level is won whe the player reaches the end of the warp gate.
     */
    private monitorLevelWon(): void {

        if (this.reachedEnd()) {

            // Play victory sound.
            SoundPlayer.warpLeveEnd();

            handleLevelWon();

            // Warp levels reward a random amount of points.
            dispatch(increaseScore(getRandomArrayElement(Points.warpLevel)));

            // Reset the player to the spawn location after a warp level or they'll appear
            // in the top of the screen right in the middle of enemies.
            dispatch(setPlayerLocationData(Locations.Player.spawnLocation.left, Locations.Player.spawnLocation.top));
        }
    }

    /**
     * True when the player reached the end of the warp level.
     */
    private reachedEnd(): boolean {
        const {
            playerState: { top },
        } = appState();

        return top < gameField.top + pixelSize * 3;
    }

    /**
     * Calculates the warp gate.
     * @param {number} outerLeft.
     * @param {number} outerRight.
     * @param {number} stepSizesX.
     * @param {number} stepSizesY.
     */
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

        // Kill the background sound.
        SoundPlayer.stopBackground();

        // Dispose all game loop subscriptions.
        this.gameLoopSubscriptions.forEach((s) => s());
    }
}