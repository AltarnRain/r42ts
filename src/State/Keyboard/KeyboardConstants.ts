/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameKeys } from "../../Utility/JSEvents";

/**
 * Module:          KeyboardConstants
 * Responsibility:  Constants for valid keys used by the GameState
 */

namespace Constants {
    export const arrowUp: GameKeys = "ArrowUp";
    export const arrowDown: GameKeys = "ArrowDown";
    export const arrowLeft: GameKeys = "ArrowLeft";
    export const arrowRight: GameKeys = "ArrowRight";
    export const backspace: GameKeys = "Backspace";
    export const f1: GameKeys = "F1";
    export const keyZ: GameKeys = "z";
    export const f2: GameKeys = "F2";
    export const keyX: GameKeys = "x";
    export const space: GameKeys = " ";
    export const keyup = "KeyUp";
    export const keydown = "KeyDown";
    export const resetKeyboardState = "resetKeyboardState";
}

export default Constants;