/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Action typing for the Keyboard State.
 */

import { GameKeys } from "../../Utility/KeyboardEvents";
import Constants from "./KeyboardConstants";

export interface KeyUp {
    type: typeof Constants.keyup;
    payload: GameKeys;
}

export interface KeyDown {
    type: typeof Constants.keydown;
    payload: GameKeys;
}

export type KeyboardTypes = KeyUp | KeyDown;