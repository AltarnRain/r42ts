/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Action definitions for the Keyboard State
 */

import { GameKeys } from "../../Utility/KeyboardEvents";
import Constants from "./Constants";
import { KeyDown, KeyUp } from "./Types";

export function keyDown(key: GameKeys): KeyDown {
    return {
        type: Constants.keydown,
        payload: key,
    };
}

export function keyUp(key: GameKeys): KeyUp {
    return {
        type: Constants.keyup,
        payload: key
    };
}