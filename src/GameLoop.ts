/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { DEBUGGING_renderHitboxes, DEBUGGING_drawGrid } from "./Debugging/Debugging";
import { TickFunction } from "./Types";
import { appState } from "./State/Store";

/**
 * Module:          GameLoop
 * Responsibility:  Handles all functions that should be called within the GameLoop.
 */

/**
 * A handle for the main loop.
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
 * Functions that draw.
 */
let drawFunctions: Array<() => void> = [];

export namespace GameLoop {
    /**
     * Start game loop
     */
    export function Start(): void {
        mainHandle = window.requestAnimationFrame(run);
    }

    /**
     * Stop game loop and clear subscriptions.
     */
    export function Stop(): void {

        if (mainHandle !== undefined) {
            window.cancelAnimationFrame(mainHandle);
        }

        updateStateFunctions = [];
        backgroundDrawFunctions = [];
        drawFunctions = [];
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
     * @param {function} f. Background draw function
     * @returns {function}. Function to remove the background draw from the queue.
     */
    export function registerBackgroundDrawing(f: () => void): () => void {
        backgroundDrawFunctions.push(f);

        return () => {
            backgroundDrawFunctions = backgroundDrawFunctions.filter((d) => d !== f);
        };
    }

    /**
     * Registers a function that is called once, but only if there is currently no render in progress.
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
        mainHandle = window.requestAnimationFrame(run);
        updateStateFunctions.forEach((f) => f(tick));
        backgroundDrawFunctions.forEach((f) => f());
        drawFunctions.forEach((f) => f());
        drawFunctions = [];

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