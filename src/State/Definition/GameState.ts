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
}