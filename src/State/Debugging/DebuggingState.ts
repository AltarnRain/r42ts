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
    /**
     * When true draws hitboxes around game objects.
     */
    drawHitboxes: boolean;

    /**
     * When true the player cannot die.
     */
    playerIsImmortal: boolean;

    /**
     * When true the player's phaser will be drawn pointing at an enemy.
     */
    renderPhaser: boolean;
}
