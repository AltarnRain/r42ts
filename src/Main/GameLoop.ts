/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { TickFunction } from "../Types/Types";

/**
 * Module:          GameLoop
 * Responsibility:  Manage the game's loop.
 */

/**
 * A handle for the main animation loop.
 */
let handle: number | undefined;

/**
 * Handle for the draw setTimeout
 */
let drawOnceHandle: number | undefined;

/**
 * Functions that subscripbe to the game tick.
 */
let updateStateFunctions: TickFunction[] = [];

/**
 * Functions that perform background drawing.
 */
let backgroundDrawFunctions: Array<() => void> = [];

/**
 * Functions that are executed once.
 */
let callOnce: Array<() => void> = [];

export namespace GameLoop {
    /**
     * Start game loop
     */
    export function Start(): void {
        handle = window.requestAnimationFrame(run);
    }

    /**
     * Stop game loop and clear subscriptions.
     */
    export function Stop(): void {

        if (handle !== undefined) {
            window.cancelAnimationFrame(handle);
        }

        if (drawOnceHandle !== undefined) {
            window.clearTimeout(drawOnceHandle);
        }

        updateStateFunctions = [];
        backgroundDrawFunctions = [];
        callOnce = [];
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
        if (drawOnceHandle === undefined) {
            callOnce.push(f);
        }
    }

    /**
     * Runner function. Calls all functions that subscribed to the game loop.
     * @param {number} tick. Current animation tick.
     */
    function run(tick: number): void {
        handle = window.requestAnimationFrame(run);

        updateStateFunctions.forEach((f) => f(tick));

        // drawOnceHandle = window.setTimeout(() => {
        backgroundDrawFunctions.forEach((f) => f());
        callOnce.forEach((f) => f());
        callOnce = [];
        drawOnceHandle = undefined;
        // }, 0);

    }
}

export default GameLoop;