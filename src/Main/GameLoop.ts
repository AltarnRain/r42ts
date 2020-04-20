/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameLoop
 * Responsibility:  Manage the game's loop.
 */

import { TickFunction } from "../Types/Types";

/**
 * A handle for the main animation loop.
 */
let drawhandle: number | undefined;

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

/**
 * Frequency at which the state is updated. This is NOT the same as FPS
 */
const stateUpdateFrequency = 10;

/**
 * handle for the state timeout.
 */
let stateHandle: number;

export namespace GameLoop {
    /**
     * Start game loop
     */
    export function Start(): void {

        stateHandle = window.setInterval(() => {
            //  Use Date.now to pass tick into the state update
            updateStateFunctions.forEach((f) => f(Date.now()));
        }, stateUpdateFrequency);

        drawhandle = window.requestAnimationFrame(runDraw);
    }

    /**
     * Stop game loop and clear subscriptions.
     */
    export function Stop(): void {

        if (drawhandle !== undefined) {
            window.cancelAnimationFrame(drawhandle);
        }

        if (stateHandle !== undefined) {
            window.clearTimeout(stateHandle);
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
    function runDraw(): void {
        drawhandle = window.requestAnimationFrame(runDraw);

        backgroundDrawFunctions.forEach((f) => f());
        callOnce.forEach((f) => f());
        callOnce = [];
        drawOnceHandle = undefined;
    }
}

export default GameLoop;