/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DebugginActions
 * Responsibility:  Actions for Debugging state.
 */

import Constants from "./DebuggingEnum";
import DebuggingState from "./DebuggingState";
import { SetDebuggingState } from "./DebuggingTypes";

export function setDebuggingState(state: DebuggingState): SetDebuggingState {
    return {

        type: Constants.setDebuggingState,
        state,
    };
}