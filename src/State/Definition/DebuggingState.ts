/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DebuggingState
 * Responsibility:  Handles the state for debugging.
 */

export default interface DebuggingState {
    drawHitboxes: boolean;
    playerIsImmortal: boolean;
    renderPhaser: boolean;
}
