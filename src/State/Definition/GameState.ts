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
    score: number;
    level: number;
    lives: number;
    phasers: number;
}