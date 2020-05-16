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
import Constants from "./KeyboardConstants";
import KeyboardState from "./KeyboardState";
import { KeyboardTypes } from "./KeyboardTypes";

/**
 * keyboardStateReducer
 * @param {DebuggingState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {KeyboardState}. New state.
 */
export default function keyboardStateReducer(state: KeyboardState = initState(), action: KeyboardTypes): KeyboardState {

    return produce(state, (draft) => {

        let keyDown = false;
        if (action.type === Constants.keydown) {
            keyDown = true;
        } else if (action.type === Constants.keyup) {
            keyDown = false;
        }

        if (action.type === Constants.resetKeyboardState) {
            draft.left = false;
            draft.right = false;
            draft.up = false;
            draft.down = false;
            draft.fire = false;
            draft.selfDestruct = false;
            draft.phraser = false;
        } else {
            switch (action.payload) {
                case undefined:
                    break;
                case Constants.arrowUp:
                    draft.up = keyDown;
                    break;
                case Constants.arrowDown:
                    draft.down = keyDown;
                    break;
                case Constants.arrowLeft:
                    draft.left = keyDown;
                    break;
                case Constants.arrowRight:
                    draft.right = keyDown;
                    break;
                case Constants.backspace:
                    draft.selfDestruct = keyDown;
                    break;
                case Constants.f1:
                    draft.fire = keyDown;
                    break;
                case Constants.f2:
                    draft.phraser = keyDown;
                    break;
                case Constants.space:
                    draft.space = keyDown;
                    break;
            }
        }
    });
}

/**
 * Initialize KeyboardState
 * @returns {KeyboardState}. Initial keyboard state.
 */
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