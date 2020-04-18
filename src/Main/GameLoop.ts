/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { TickFunction } from "../Types/Types";
import { clearGameFieldBackground, drawGameFieldBorder } from "../GameScreen/StaticRenders";
import { drawLevelBanner } from "../GameScreen/LevelBanner";

/**
 * Module:          GameLoop
 * Responsibility:  Manage the game's loop.
 */

/**
 * A handle for the main animation loop.
 */
let handle: number = 0;

/**
 * Functions that subscripbe to the game tick.
 */
let subscriptions: TickFunction[] = [];

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
    window.cancelAnimationFrame(handle);
    subscriptions = [];
}

/**
 * Register a tick handling function
 * @param {TickFunction} f. A function that handles a tick
 * @returns {() => void}. A function that removes the tick handler funtion from the subscription array.
 */
export function register(f: TickFunction): () => void {
    subscriptions.push(f);

    return () => {
        subscriptions = subscriptions.filter((s) => s !== f);
    };
}

/**
 * Runner function. Calls all functions that subscribed to the game loop.
 * @param {number} tick. Current animation tick.
 */
function run(tick: number): void {
    clearGameFieldBackground();
    drawGameFieldBorder();

    subscriptions.forEach((f) => f(tick));
    handle = window.requestAnimationFrame(run);
}
