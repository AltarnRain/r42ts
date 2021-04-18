/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { WarpLevelSteps } from "./WarpLevelTypes";

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
     * Last score when a life and phaser was awarded.
     */
    lastAwardScore: number;

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
     * True then the game is paused.
     */
    pause: boolean;

    /**
     * The complexity of a warp level.
     */
    warpLevelSteps: WarpLevelSteps;

    /**
     * Flag that triggers the game over event.
     */
    gameOver: boolean;

    /**
     * The number of bullets the player fired of the course of the game
     */
    bulletsFired: number;

    /**
     * The number of enemies the player hit in total.
     */
    enemiesHit: number;

    /**
     * Time level time limit
     */
    timeLevelTimeLimit: number;

    /**
     * Only true when the player has finished all 42 levels.
     * Triggers enemies at their hardest.
     */
    hardMode: boolean;
}