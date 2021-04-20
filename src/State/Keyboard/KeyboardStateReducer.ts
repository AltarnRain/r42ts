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
import { KeybindingsMapping } from "../Settings/KeybindingsMapping";
import Constants from "./KeyboardConstants";
import KeyboardState from "./KeyboardState";
import { KeyboardTypes } from "./KeyboardTypes";

/**
 * keyboardStateReducer
 * @param {DebuggingState} state. The current state.
 * @param {KeyboardTypes} action. The desired action with optional paylood.
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
            // Reset the state. Required when the game is over, otherwise the player will spawn in
            // and move in the last registered direction.
            draft.left = false;
            draft.right = false;
            draft.up = false;
            draft.down = false;
            draft.fire = false;
            draft.phraser = false;
        } else {
            if (action.type !== Constants.keydown && action.type !== Constants.keyup) {
                return state;
            }

            const playerAction = KeybindingsMapping.getMapping().find((v) => v.binding === action.payload);
            switch (playerAction?.keycode) {
                case undefined:
                    break;
                case "upkey":
                    draft.up = keyDown;
                    break;
                case "downKey":
                    draft.down = keyDown;
                    break;
                case "leftKey":
                    draft.left = keyDown;
                    break;
                case "rightKey":
                    draft.right = keyDown;
                    break;
                case "fireKey":
                    draft.fire = keyDown;
                    break;
                case "phaserKey":
                    draft.phraser = keyDown;
                    break;
                case "pauseKey":
                    draft.pause = keyDown;
                    break;
                case "menu":
                    draft.menu = keyDown;
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
        pause: false,
        menu: false,
    };
}