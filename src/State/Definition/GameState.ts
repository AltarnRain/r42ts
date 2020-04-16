/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import DebuggingState from "./DebuggingState";
import LevelState from "./LevelState";
import PlayerState from "./PlayerState";

/**
 * Module:          GameState
 * Responsibility:  Definitiob of the Game's state
 */

export default interface GameState {
    /**
     * The level state. Only the current level.
     */
    level: LevelState;

    /**
     * State of the player
     */
    player: PlayerState;

    /**
     * Debugging state. Only used for development.
     */

    debugging: DebuggingState;
}