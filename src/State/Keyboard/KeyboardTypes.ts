/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyboardTypes
 * Responsibility:  Action typing for the Keyboard State.
 */

import { GameKeys } from "../../Utility/JSEvents";
import Constants from "./KeyboardConstants";

export interface KeyUp {
    type: typeof Constants.keyup;
    payload: GameKeys;
}

export interface KeyDown {
    type: typeof Constants.keydown;
    payload: GameKeys;
}

export interface Reset {
    type: typeof Constants.resetKeyboardState;
}

export type KeyboardTypes = KeyUp | KeyDown | Reset;