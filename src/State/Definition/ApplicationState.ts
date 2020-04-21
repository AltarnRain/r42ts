/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import DebuggingState from "./DebuggingState";
import GameState from "./GameState";
import KeyboardState from "./KeyboardState";
import EnemyLevelState from "./EnemyLevelState";
import PlayerState from "./PlayerState";

/**
 * Module:          ApplicationState
 * Responsibility:  Defines the global managed state for the entire application.
 */

export default interface ApplicationState {
    /**
     * The a level state with enemies. Only the current level.
     */
    enemyLevelState: EnemyLevelState;

    /**
     * State of the player.
     */
    playerState: PlayerState;

    /**
     * Debugging state. Only used for development.
     */

    debuggingState: DebuggingState;

    /**
     * Over all state of the game. Keeps track of score, lives, phaser charges, etc.
     */
    gameState: GameState;

    /**
     * Current state of the game control keys.
     */
    keyboardState: KeyboardState;
}