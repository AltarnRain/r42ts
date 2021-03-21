/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Guard from "../Guard";
import setCanvasDimensions from "../Render/SetCanvasDimensions";
import { setPause } from "../State/Game/GameActions";
import { keyDown, keyUp } from "../State/Keyboard/KeyboardActions";
import { appState, dispatch } from "../State/Store";

/**
 * Module:          JSEvents
 * Responsibility:  Handle JS Window events.
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
    "z" |
    "F2" |
    "x" |
    " ";

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
    "z",
    "F2",
    "x",
    " ",
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

    if (Guard.isValidGameKey(event.key)) {
        // Only dispatch if the key is a game control key.
        event.stopPropagation();
        event.preventDefault();

        // If the space bar is hit and the player is alive the player pauses the game
        // otherwise, the space bar is used to pause formation.
        if (event.code === "Space" && playerState.alive) {
            if (gameState.pause) {
                dispatch(setPause(false));
            } else {
                dispatch(setPause(true));
            }
        } else {
            dispatch(keyDown(event.key));
        }
    }
}

/**
 * onKeyUp. Fired when a game control key is let go.
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyUp(event: KeyboardEvent): void {
    if (Guard.isValidGameKey(event.key)) {
        // Only dispatch if the key is a game control key.
        event.stopPropagation();
        event.preventDefault();

        dispatch(keyUp(event.key));
    }
}

/**
 * Adds event listeners for keyup and keydown.
 */
export function registerListeners(): void {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", setCanvasDimensions);
}

/**
 * Removes the event listeners
 */
export function unregisterListeners(): void {
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", setCanvasDimensions);
}