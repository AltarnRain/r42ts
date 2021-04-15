/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Constants from "./KeyboardConstants";

/**
 * Module:          KeyboardTypes
 * Responsibility:  Action typing for the Keyboard State.
 */

export interface KeyUp {
    type: typeof Constants.keyup;
    payload: string;
}

export interface KeyDown {
    type: typeof Constants.keydown;
    payload: string;
}

export interface Reset {
    type: typeof Constants.resetKeyboardState;
}

export type KeyboardTypes = KeyUp | KeyDown | Reset;