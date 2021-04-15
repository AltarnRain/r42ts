/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyboardActions
 * Responsibility:  Action definitions for the Keyboard State
 */

import Constants from "./KeyboardConstants";
import { KeyDown, KeyUp, Reset } from "./KeyboardTypes";

export function keyDown(key: string): KeyDown {
    return {
        type: Constants.keydown,
        payload: key,
    };
}

export function keyUp(key: string): KeyUp {
    return {
        type: Constants.keyup,
        payload: key
    };
}

export function resetKeyboardState(): Reset {
    return {
        type: Constants.resetKeyboardState,
    };
}