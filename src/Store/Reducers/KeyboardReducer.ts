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
import { GameControlKeys } from "../../Constants/KeyConstants";
import ActionPayload from "../Definitions/ActionPayload";
import KeyboardState from "../Definitions/KeyboardState";
import GameActions from "../GameActions";

/**
 * keyboard Reducer
 * @param {State} state. Current state of keys held down.
 * @param {ActionPayload} action. Current key action. Can be key down or keyup. The payload the the KeyboardEvent.code.
 * @returns {KeyboardState}. The Keyboard state.
 */
const keyboardReducer = (state: KeyboardState = init(), action: ActionPayload): KeyboardState => {
    return produce(state, (draft) => {

        const key: string = action.payload;
        switch (action.type) {
            case GameActions.keyDown:
                updateGameResponse(key, draft, true);

                break;
            case GameActions.keyUp:
                updateGameResponse(key, draft, false);

                break;
        }
    });
};

/**
 * Intialize the Keyboard state.
 * @returns {KeyboardState}. Initial keyboard state.
 */
const init = (): KeyboardState => {
    return {
        up: false,
        down: false,
        left: false,
        right: false,
        fire: false,
        phraser: false,
        selfDestruct: false,
    };
};

/**
 * Sets the game repsonse booleans pased on the key that was just pressed.
 * @param {string} key. The key that was pressed or let go.
 * @param {KeyboardState} state. Current keyboard state.
 * @param {boolean} keyDown. Then true when the key is held down, false if the key was let go.
 */
const updateGameResponse = (key: string, state: KeyboardState, keyDown: boolean): void => {
    switch (key) {
        case GameControlKeys.ArrowUp:
            state.up = keyDown;
            break;
        case GameControlKeys.ArrowDown:
            state.down = keyDown;
            break;
        case GameControlKeys.ArrowLeft:
            state.left = keyDown;
            break;
        case GameControlKeys.ArrowRight:
            state.right = keyDown;
            break;
        case GameControlKeys.Backspace:
            state.selfDestruct = keyDown;
            break;
        case GameControlKeys.F1:
            state.fire = keyDown;
            break;
        case GameControlKeys.F2:
            state.phraser = keyDown;
            break;
    }
};

export default keyboardReducer;
