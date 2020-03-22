/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          AppState
 * Responsibility:  Defines the application state
 */

import KeyboardState from "./Definitions/KeyboardState";

export default interface AppState {
    keyboardState: KeyboardState;
}
