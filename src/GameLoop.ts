/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "./Constants/Constants";
import { DEBUGGING_drawGrid, DEBUGGING_renderHitboxes } from "./Debugging/Debugging";
import { drawGameFieldBorder } from "./GameScreen/StaticRenders";
import { drawStatusBar } from "./GameScreen/StatusBar";
import playerSpawnManager from "./Player/PlayerSpawnManager";
import genericRunner from "./Runners/GenericRunner";
import levelProgressionRunner, { resetLevelProgression } from "./Runners/LevelProgressionRunner";
import playerRunner from "./Runners/PlayerRunner";
import { gameStart } from "./State/Game/GameActions";
import { resetKeyboardState } from "./State/Keyboard/KeyboardActions";
import { setPlayerIsAlive, setPlayerLocationData } from "./State/Player/PlayerActions";
import { appState, dispatch } from "./State/Store";
import { TickFunction } from "./Types";
import { registerListeners, unregisterListeners } from "./Utility/KeyboardEvents";

/**
 * Module:          GameLoop
 * Responsibility:  Handles all functions that should be called within the GameLoop.
 *                  Is also responsible for registering required 'Runners' and disposing them
 *                  When the game resets after game over.
 */

/**
 * A handle for the main loop. Used to cancel the animation loop;
 */
let mainHandle: number | undefined;

/**
 * Functions that subscripbe to the game tick.
 */
let updateStateFunctions: TickFunction[] = [];

/**
 * Functions that perform background drawing.
 */
let backgroundDrawFunctions: Array<() => void> = [];

/**
 * Functions that perform foreground drawing.
 */
let foregroundDrawFunctions: Array<() => void> = [];

let levelWonFunctions: Array<() => void> = [];

/**
 * Functions that draw.
 */
let drawFunctions: Array<() => void> = [];

export namespace GameLoop {
    /**
     * Start game loop
     */
    export function start(): void {

        // Register the statusBar runner. This render's lives, phasers, score, etc.
        // This is a foreground draw process. Enemies will appear to pass under it.
        GameLoop.registerForegroundDrawing(drawStatusBar);

        // Register the game field border. This is blue rectangle that surrounds every level
        // Also a foreground drawing processess for the same reasons as the status bar.
        GameLoop.registerForegroundDrawing(drawGameFieldBorder);

        // Register the player runner. The player runner keeps track of things the player does like shooting, moving, etc.
        GameLoop.registerUpdateState(playerRunner);

        // Register the player spawn manager. The player spawn manager checks if the player has dies and
        // which kind of warp in should occur.
        GameLoop.registerUpdateState(playerSpawnManager);

        // Register the genericRunner. This runner handle explosion centers, shrapnell and bullet rending
        // This can occur in any level which is why it is a seperate runner.
        GameLoop.registerUpdateState(genericRunner);

        // Register the level progression runner. Keeps track if the next level should be
        // started. Also keeps track of score increases that rewards a life and/or phaser.
        GameLoop.registerUpdateState(levelProgressionRunner);

        // Register keyboard event listeners. Required for player movement.
        registerListeners();

        // Everything is setup, lets begin the game loop.
        mainHandle = window.requestAnimationFrame(run);
    }

    /**
     * Stop game loop and clear subscriptions.
     */
    export function stop(): void {

        if (mainHandle !== undefined) {
            window.cancelAnimationFrame(mainHandle);
        }

        updateStateFunctions = [];
        backgroundDrawFunctions = [];
        drawFunctions = [];
        foregroundDrawFunctions = [];
        levelWonFunctions = [];

        unregisterListeners();
    }

    /**
     * Register a tick handling function
     * @param {TickFunction} f. A function that handles a tick
     * @returns {() => void}. A function that removes the tick handler funtion from the subscription array.
     */
    export function registerUpdateState(f: TickFunction): () => void {
        updateStateFunctions.push(f);

        return () => {
            updateStateFunctions = updateStateFunctions.filter((s) => s !== f);
        };
    }

    /**
     * Register a function that draws the background.
     * @param {function} f. draw function
     * @returns {function}. Function to remove the draw from the queue.
     */
    export function registerBackgroundDrawing(f: () => void): () => void {
        backgroundDrawFunctions.push(f);

        return () => {
            backgroundDrawFunctions = backgroundDrawFunctions.filter((d) => d !== f);
        };
    }

    /**
     * Register a function that draws one the foreground.
     * @param {function} f. draw function
     * @returns {function}. Function to remove the draw function from the queue.
     */
    export function registerForegroundDrawing(f: () => void): () => void {
        foregroundDrawFunctions.push(f);

        return () => {
            foregroundDrawFunctions = foregroundDrawFunctions.filter((d) => d !== f);
        };
    }

    /**
     * Used to monitor if a level is won. Requires a seperate array to ensure level won functions for won
     * levels are not execute when the level IS won, the current level is loading and the state has not been
     * updated yet so it triggers an instant win. I found this out the hard way.
     * @param {function} f. draw function
     * @returns {function}. Function to remove the draw function from the queue.
     */
    export function registerLevelWonMonitor(f: () => void): () => void {
        levelWonFunctions.push(f);

        return () => {
            levelWonFunctions = levelWonFunctions.filter((d) => d !== f);
        };
    }

    /**
     * Registers a function that is called once.
     * @param {function} f. A function.
     */
    export function registerDraw(f: () => void): void {
        drawFunctions.push(f);
    }

    /**
     * Runner function. Calls all functions that subscribed to the game loop.
     * @param {number} tick. Current animation tick.
     */
    function run(tick: number): void {
        // Requeue animation loop.
        mainHandle = window.requestAnimationFrame(run);

        const {
            gameState: { pause, gameOver, enemiesHit, bulletsFired, score, phasersFired }
        } = appState();

        // Pausing means no state updates. Drawing will also stop but the CANVAS will not reset it self
        // so it shows the last rendered image.
        if (pause) {
            return;
        }

        // Player ran out of lives triggering a game over event.
        if (gameOver) {

            // Stop everything.
            stop();

            // Rester the state of the levelProgressionRunner.
            resetLevelProgression();

            // Calculate how often the player hit an enemy.
            let hitPercentage = Math.round((enemiesHit / bulletsFired) * 100);

            // Don't show 'NaN' show 0.
            if (isNaN(hitPercentage)) {
                hitPercentage = 0;
            }

            // Display some statistics.
            alert(`
            Game over!
            Total score: ${score}.
            Bullets fired: ${bulletsFired}.
            Phasers fired: ${phasersFired}.
            Enemies hit: ${enemiesHit}.
            %Hit: ${hitPercentage}
            Click OK to restart from level 1`);

            // Reset the entire game.
            // Player goes to its original spawn location.
            dispatch(setPlayerLocationData(Locations.Player.spawnLocation.left, Locations.Player.spawnLocation.top));

            // Reset keyboard state so the player doesn't fly off when the game starts
            dispatch(resetKeyboardState());

            // Player is no longer alive. This will trigger the PlayerSpawnManager to handle a formation.
            dispatch(setPlayerIsAlive(false));

            // Set the game state back to its starting values.
            dispatch(gameStart());

            // Ok. all setup again, lets start the game loop.
            start();
        }

        // Update the states. This will also register draw function (if required).
        updateStateFunctions.forEach((f) => f(tick));

        // Draw the back ground, other stuff is drawn over this so we render it first.
        backgroundDrawFunctions.forEach((f) => f());

        // Now we go over the registered draw functions drawing over the background.
        drawFunctions.forEach((f) => f());
        drawFunctions = [];

        // Finally we finish with drawing foreground stuff. The status bar for one, and the game border
        // are both foreground and render over anything.
        foregroundDrawFunctions.forEach((f) => f());

        levelWonFunctions.forEach((f) => f());

        // Some debugging functions.
        const { debuggingState } = appState();

        if (debuggingState.drawHitboxes) {
            DEBUGGING_renderHitboxes();
        }

        if (debuggingState.drawGrid) {
            DEBUGGING_drawGrid(debuggingState.gridDetail);
        }
    }
}

export default GameLoop;