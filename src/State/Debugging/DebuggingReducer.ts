/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Constants from "./DebuggingConstants";
import DebuggingState from "./DebuggingState";
import { DebuggingTypes } from "./DebuggingTypes";

/**
 * Module:          DebuggingReducer
 * Responsibility:  Handles the debugging state.
 */

/**
 * debuggingReducer
 * @param {DebuggingState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {DebuggingState}. New state.
 */
export default function debuggingReducer(state: DebuggingState = {}, action: DebuggingTypes): DebuggingState {
    switch (action.type) {
        case Constants.setDebuggingState:
            state = { ...action.state };
            break;
    }

    return state;
}