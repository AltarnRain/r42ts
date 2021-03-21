/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameResultModel
 * Responsibility:  Object model that defines the results of a game when it ends.
 */

export default interface GameResultModel {
    /**
     * Score of the player
     */
    score: number;

    /**
     * Number of bullets fired by the player.
     */
    bulletsFired: number;

    /**
     * Number of enemies hit.
     */
    enemiesHit: number;
}