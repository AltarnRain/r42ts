/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { isValidGameKey } from "../Guard";
import { keyDown, keyUp } from "../State/Keyboard/Actions";
import { appState, dispatch } from "../State/Store";
import { setPause } from "../State/Game/Actions";

/**
 * Module:          KeyboardEVents
 * Responsibility:  handle keyboard events.
 */

/**
 * Valid game keys.
 */
export type GameKeys =
    "ArrowUp" |
    "ArrowDown" |
    "ArrowLeft" |
    "ArrowRight" |
    "Backspace" |
    "F1" |
    "F2" |
    "Space";

/**
 * Array of valid game keys.
 */
export const allGameKeys: GameKeys[] = [
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "Backspace",
    "F1",
    "F2",
    "Space",
];

/**
 * onKeyDown. Fired when a game control key is pushed down..
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyDown(event: KeyboardEvent): void {

    const {
        playerState,
        gameState
    } = appState();

    if (isValidGameKey(event.code)) {
        // Only dispatch if the key is a game control key.
        event.stopPropagation();
        event.preventDefault();

        // If the space bar is hit and the player is alive the player pauses the game
        // otherwise, the space bar is used to pause formation.
        if (event.code === "Space" && playerState.ship !== undefined) {
            if (gameState.pause) {
                dispatch(setPause(false));
            } else {
                dispatch(setPause(true));
            }
        } else {
            dispatch(keyDown(event.code));
        }
    }
}

/**
 * onKeyUp. Fired when a game control key is let go.
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyUp(event: KeyboardEvent): void {
    if (isValidGameKey(event.code)) {
        // Only dispatch if the key is a game control key.
        event.stopPropagation();
        event.preventDefault();

        dispatch(keyUp(event.code));
    }
}

/**
 * Adds event listeners for keyup and keydown.
 */
export function registerListeners(): void {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
}

/**
 * Removes the event listeners
 */
export function unregisterListeners(): void {
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("keydown", onKeyDown);
}
