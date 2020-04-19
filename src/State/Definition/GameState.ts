/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameState
 * Responsibility:  Overall state of the game
 */

export default interface GameState {
    /**
     * Current score.
     */
    score: number;

    /**
     * Current level
     */
    level: number;

    /**
     * The player's remaining lives.
     */
    lives: number;

    /**
     * The player's phaser charges.
     */
    phasers: number;

    /**
     * The level banner is currently on screen.
     */
    showingLevelBanner: false;

    /**
     * When true the level is running at the moment. Used in addition with other state checks that can only occur if the level is active.
     */
    levelRunning: false;
}