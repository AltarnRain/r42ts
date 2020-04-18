/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import DebuggingState from "./DebuggingState";
import GameState from "./GameState";
import KeyboardState from "./KeyboardState";
import LevelState from "./LevelState";
import PlayerState from "./PlayerState";

/**
 * Module:          GameState
 * Responsibility:  Definitiob of the Game's state
 */

export default interface ApplicationState {
    /**
     * The level state. Only the current level.
     */
    levelState: LevelState;

    /**
     * State of the player
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