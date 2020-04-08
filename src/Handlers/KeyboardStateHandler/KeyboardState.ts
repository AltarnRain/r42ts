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
    /**
     * When true the up arrow key is held down.
     */
    up: boolean;

    /**
     * When true the down arrow key is held down.
     */
    down: boolean;

    /**
     * When true the left arrow key is held down.
     */
    left: boolean;

    /**
     * When true the right arrow key is held down.
     */
    right: boolean;

    /**
     * When true the F1 key is held down.
     */
    fire: boolean;

    /**
     * When true the F2 key is held down.
     */
    phraser: boolean;

    /**
     * When true the backspace key is held down.
     */
    selfDestruct: boolean;
}
