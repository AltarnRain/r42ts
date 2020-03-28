/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyboardState
 * Responsibility:  Keep track of keys being held down and released.
 */

export default interface KeyboardState {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    fire: boolean;
    phraser: boolean;
    selfDestruct: boolean;
}
