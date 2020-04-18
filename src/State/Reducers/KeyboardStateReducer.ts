/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyboardReducer
 * Responsibility:  Handles keyup and keydown events and stores the currently held down heys.
 */

import produce from "immer";
import ActionPayload from "../ActionPayLoad";
import KeyboardState from "../Definition/KeyboardState";

/**
 * Updates the keyboard state object.
 * @param {string} key. Keyboard string code.
 * @param {boolean} keyDown. True when the key is held down, false if the key is let go.
 */
export function keyboardStateReducer(state: KeyboardState = initState(), action: ActionPayload<string>): KeyboardState {

    return produce(state, (draft) => {

        let keyDown = false;
        if (action.type === "keydown") {
            keyDown = true;
        } else if (action.type === "keyup") {
            keyDown = false;
        }

        switch (action.payload) {
            case undefined:
                break;
            case "ArrowUp":
                draft.up = keyDown;
                break;
            case "ArrowDown":
                draft.down = keyDown;
                break;
            case "ArrowLeft":
                draft.left = keyDown;
                break;
            case "ArrowRight":
                draft.right = keyDown;
                break;
            case "Backspace":
                draft.selfDestruct = keyDown;
                break;
            case "F1":
                draft.fire = keyDown;
                break;
            case "F2":
                draft.phraser = keyDown;
                break;
            case "Space":
                draft.space = keyDown;
                break;
        }
    });
}

function initState(): KeyboardState {
    return {
        up: false,
        down: false,
        left: false,
        right: false,
        fire: false,
        phraser: false,
        selfDestruct: false,
        space: false,
    };
}