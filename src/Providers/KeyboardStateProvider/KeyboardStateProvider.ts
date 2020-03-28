/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyboardReducer
 * Responsibility:  Handles keyup and keydown events and stores the currently held down heys.
 */

import getGameControlKeys, { GameControlKeys } from "../../Constants/KeyConstants";
import KeyboardState from "./KeyboardState";

/**
 * Construct the keyboard state provider.
 */

const KeyboardState: KeyboardState = {
    up: false,
    down: false,
    left: false,
    right: false,
    fire: false,
    phraser: false,
    selfDestruct: false,
};

registerListeners();

/**
 * onKeyDown. Fired when a game control key is pushed down..
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyDown(event: KeyboardEvent): void {

    // Only dispatch if the key is a game control key.
    if (getGameControlKeys().find((s) => s === event.code)) {
        event.stopPropagation();
        event.preventDefault();

        updateState(event.key, false);
    }
}

/**
 * onKeyUp. Fired when a game control key is let go.
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyUp(event: KeyboardEvent): void {
    // Only dispatch if the key is a game control key.
    if (getGameControlKeys().find((s) => s === event.code)) {
        event.stopPropagation();
        event.preventDefault();

        updateState(event.key, false);
    }
}

/**
 * Adds event listeners for keyup and keydown.
 */
function registerListeners(): void {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
}

export function unregisterListeners(): void {
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("keydown", onKeyDown);
}

function updateState(key: string, keyDown: boolean): void {
    switch (key) {
        case GameControlKeys.ArrowUp:
            KeyboardState.up = keyDown;
            break;
        case GameControlKeys.ArrowDown:
            KeyboardState.down = keyDown;
            break;
        case GameControlKeys.ArrowLeft:
            KeyboardState.left = keyDown;
            break;
        case GameControlKeys.ArrowRight:
            KeyboardState.right = keyDown;
            break;
        case GameControlKeys.Backspace:
            KeyboardState.selfDestruct = keyDown;
            break;
        case GameControlKeys.F1:
            KeyboardState.fire = keyDown;
            break;
        case GameControlKeys.F2:
            KeyboardState.phraser = keyDown;
            break;
    }
}

export default KeyboardState;