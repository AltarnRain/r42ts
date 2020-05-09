/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Actions for Debugging state.
 */

import Constants from "./DebuggingConstants";
import DebuggingState from "./DebuggingState";
import { SetDebuggingState } from "./DebuggingTypes";

export function setDebuggingState(state: DebuggingState): SetDebuggingState {
    return {

        type: Constants.setDebuggingState,
        state,
    };
}