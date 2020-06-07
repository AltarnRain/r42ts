/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "./Constants/Constants";
import { DEBUGGING_drawGrid, DEBUGGING_renderHitboxes } from "./Debugging/Debugging";
import { drawGameFieldBorder } from "./GameScreen/StaticRenders";
import { drawStatusBar } from "./GameScreen/StatusBar";
import GameResultModel from "./Models/GameResultModel";
import playerSpawnRunner from "./Player/PlayerSpawnRunner";
import dimensionProvider from "./Providers/DimensionProvider";
import SpeedProvider from "./Providers/SpeedProvider";
import EnemyLevelRunner from "./Runners/EnemyLevelRunner";
import genericRunner from "./Runners/GenericRunner";
import levelProgressionRunner, { resetLevelProgression } from "./Runners/LevelProgressionRunner";
import playerRunner from "./Runners/PlayerRunner";
import { SoundPlayer } from "./Sound/SoundPlayer";
import { resetLevelState as resetEnemyLevelState } from "./State/EnemyLevel/EnemyLevelActions";
import { gameStart, resetScore, setPlaySounds } from "./State/Game/GameActions";
import { resetKeyboardState } from "./State/Keyboard/KeyboardActions";
import { setPlayerIsAlive, setPlayerLocationData } from "./State/Player/PlayerActions";
import { appState, dispatch } from "./State/Store";
import TickFunction from "./Types/TickFunction";
import { registerListeners, unregisterListeners } from "./Utility/KeyboardEvents";
import setCanvasDimensions from "./Render/SetCanvasDimensions";

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

/**
 * Array of functions that check if a level is won. Technically, this is a single method but
 * I am not setting functions.
 */
let levelWonFunctions: Array<() => void> = [];

/**
 * Functions that draw.
 */
let drawFunctions: Array<() => void> = [];

/**
 * Functions that monitor state to pick which background sound to play
 */
let soundRunners: Array<(pause: boolean) => void> = [];

/**
 * A function passed from the outside that will handle the game over event
 * If not defined the GameLoop will show a pop-up.
 */
let gameOverHandler: (result: GameResultModel) => void | undefined;

const {
    fullGameWidth
} = dimensionProvider();

export namespace GameLoop {
    /**
     * Start game loop
     */
    export function init(fps: number, gameOverCallback?: (result: GameResultModel) => void, sound: boolean = true): void {

        // Singleton, only created once. Future create calls will not have any effect.
        // Calculates all game speeds based on the passed frame rate. This is done exactly once.
        SpeedProvider.create(fps, fullGameWidth);

        if (gameOverCallback) {
            gameOverHandler = gameOverCallback;
        }

        dispatch(setPlaySounds(sound));

        const body = document.getElementById("body") as HTMLBodyElement;
        if (!body) {
            throw new Error("Could not find a body element");
        }

        setCanvasDimensions();

        // Reset the game's dimensions each time the screen size changes.
        body.onresize = () => setCanvasDimensions();

        start();
    }

    function start() {

        // Register the statusBar runner. This render's lives, phasers, score, etc.
        // This is a foreground draw process. Enemies will appear to pass under it.
        GameLoop.registerForegroundDrawing(drawStatusBar);

        // Register the game field border. This is blue rectangle that surrounds every level
        // Also a foreground drawing processess for the same reasons as the status bar.
        GameLoop.registerForegroundDrawing(drawGameFieldBorder);

        // Register the player runner. The player runner keeps track of things the player does like shooting, moving, etc.
        GameLoop.registerUpdateState(playerRunner);

        // Register the genericRunner. This runner handle explosion centers, shrapnell and bullet rending
        // This can occur in any level which is why it is a seperate runner.
        GameLoop.registerUpdateState(genericRunner);

        // Register the level progression runner. Keeps track if the next level should be
        // started. Also keeps track of score increases that rewards a life and/or phaser.
        GameLoop.registerUpdateState(levelProgressionRunner);

        // Register the player spawn manager. The player spawn manager checks if the player has dies and
        // which kind of warp in should occur. This runner relies on a derived state so it is one
        // of the last runners we add to the queue. It also relies on the level progression
        // runner because it load levels and changes movement limits for the player
        GameLoop.registerUpdateState(playerSpawnRunner);

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

        // Kill the background sounds. Other sounds like explosions will not play
        // because the state is no longer updated and nothing will trigger them
        SoundPlayer.stopBackground();

        updateStateFunctions = [];
        backgroundDrawFunctions = [];
        foregroundDrawFunctions = [];
        levelWonFunctions = [];
        drawFunctions = [];
        soundRunners = [];

        unregisterListeners();
        dispatch(resetScore());
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
     * levels are not executed when the level IS won, the current level is loading and the state has not been
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
     * Register a function that checks which background sound to play based on the current state.
     * @param {() => void} f. A function.
     */
    export function registerSoundRunner(f: (pause: boolean) => void) {
        soundRunners.push(f);

        return () => {
            soundRunners = soundRunners.filter((d) => d !== f);
        };
    }

    /**
     * Runner function. Calls all functions that subscribed to the game loop.
     * @param {number} tick. Current animation tick.
     */
    function run(tick: number): void {
        // Requeue animation loop.
        mainHandle = window.requestAnimationFrame(run);

        const {
            gameState: { pause, gameOver, enemiesHit, bulletsFired, score }
        } = appState();

        // Play background sound(s) or stop them when the game is paused. this is why the
        // GameLoop will keep running the sound runners. Sounds keep playing otherwise.
        soundRunners.forEach((f) => f(pause));

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

            // Reset the entire game.
            // Player goes to its original spawn location.
            dispatch(setPlayerLocationData(Locations.Player.spawnLocation.left, Locations.Player.spawnLocation.top));

            // Reset keyboard state so the player doesn't fly off when the game starts
            dispatch(resetKeyboardState());

            // Player is no longer alive. This will trigger the PlayerSpawnManager to handle a formation.
            dispatch(setPlayerIsAlive(false));

            // Set the game state back to its starting values.
            dispatch(gameStart());

            // Remove the remaining enemies.
            EnemyLevelRunner.setNewEnemies([]);

            // Clear any remaining particles, etc.
            dispatch(resetEnemyLevelState());

            // In normal mode showing game ending statistics is
            // handled by the UI, not by showing a pop-up.
            if (gameOverHandler !== undefined) {
                const canvas = document.getElementById("canvas") as HTMLCanvasElement;
                if (canvas) {
                    // Game over - reduce the canvas to nothing so the game over
                    // screen displays properly.
                    canvas.width = 0;
                    canvas.height = 0;
                    canvas.style.left = `0px`;
                    canvas.style.top = `0px`;
                    canvas.style.width = `0px`;
                    canvas.style.height = `0px`;
                }

                const result: GameResultModel = {
                    bulletsFired,
                    score,
                    enemiesHit,
                };

                gameOverHandler(result);
                return;
            }

            // Ok. all setup again, lets start the game loop.
            start();
        }

        // Update the states. This will also register draw function (if required).
        updateStateFunctions.forEach((f) => f(tick));

        // Now we check if changes to the state means the player has won the level
        // this HAS to be done in a new function because mixing then with regular state
        // update function has... interesting effects.
        levelWonFunctions.forEach((f) => f());

        // Draw the back ground, other stuff is drawn over this so we render it first.
        backgroundDrawFunctions.forEach((f) => f());

        // Now we go over the registered draw functions drawing over the background.
        drawFunctions.forEach((f) => f());
        drawFunctions = [];

        // Finally we finish with drawing foreground stuff. The status bar for one, and the game border
        // are both foreground and render over anything.
        foregroundDrawFunctions.forEach((f) => f());

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