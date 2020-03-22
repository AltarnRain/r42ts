/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyboardEventDispatcher
 * Responsibility:  Dispatches an event for keyup and keydown to redux when the key is a game control key.
 */

import getGameControlKeys from "../Constants/KeyConstants";
import GameActions from "../Store/GameActions";
import { appStore } from "../Store/Store";

export class KeyboardEventDispatcher {

    /**
     * onKeyDown. Fired when a game control key is pushed down..
     * @param {KeyboardEvent} event. A keyboard event.
     */
    private static onKeyDown = (event: KeyboardEvent): void => {

        // Only dispatch if the key is a game control key.
        if (getGameControlKeys().find((s) => s === event.code)) {
            event.stopPropagation();
            event.preventDefault();
            appStore().dispatch({ type: GameActions.keyDown, payload: event.code });
        }
    }

    /**
     * onKeyUp. Fired when a game control key is let go.
     * @param {KeyboardEvent} event. A keyboard event.
     */
    private static onKeyUp = (event: KeyboardEvent): void => {
        // Only dispatch if the key is a game control key.
        if (getGameControlKeys().find((s) => s === event.code)) {
            event.stopPropagation();
            event.preventDefault();
            appStore().dispatch({ type: GameActions.keyUp, payload: event.code });
        }
    }

    /**
     * Adds event listeners for keyup and keydown.
     */
    public static registerListeners(): () => void {
        window.addEventListener("keyup", KeyboardEventDispatcher.onKeyUp);
        window.addEventListener("keydown", KeyboardEventDispatcher.onKeyDown);

        return () => {
            window.removeEventListener("keyup", KeyboardEventDispatcher.onKeyUp);
            window.removeEventListener("keydown", KeyboardEventDispatcher.onKeyDown);
        };
    }
}