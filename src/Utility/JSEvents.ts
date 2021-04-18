/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Guard from "../Guard";
import { Canvas } from "../Render/Canvas";
import { setPause, setScreenState } from "../State/Game/GameActions";
import { keyDown, keyUp } from "../State/Keyboard/KeyboardActions";
import { appState, dispatch } from "../State/Store";

/**
 * Module:          JSEvents
 * Responsibility:  Handle JS Window events.
 */

/**
 * Valid game keys.
 */

/**
 * onKeyDown. Fired when a game control key is pushed down..
 * @param {KeyboardEvent} event. A keyboard event.
 */
function onKeyDown(event: KeyboardEvent): void {

    const {
        playerState,
        gameState
    } = appState();

    if (Guard.isValidGameKey(event.code)) {
        // Only dispatch if the key is a game control key.
        event.stopPropagation();
        event.preventDefault();

        // If the space bar is hit and the player is alive the player pauses the game
        // otherwise, the space bar is used to pause formation.
        if (event.code === appState().settingsState.keybindings.pauseKey && playerState.alive) {
            if (gameState.pause) {
                dispatch(setPause(false));
            } else {
                dispatch(setPause(true));
            }
        } else if (event.code === appState().settingsState.keybindings.menu) {
            dispatch(setPause(true));
            dispatch(setScreenState("options"));
            Canvas.minimizeCanvas();
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
    if (Guard.isValidGameKey(event.code)) {
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
    window.addEventListener("resize", Canvas.setCanvasDimensions);
}

/**
 * Removes the event listeners
 */
export function unregisterListeners(): void {
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", Canvas.setCanvasDimensions);
}