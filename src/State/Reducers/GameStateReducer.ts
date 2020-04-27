/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import ActionPayload from "../ActionPayLoad";
import GameState from "../Definition/GameState";

/**
 * Module:          GameStateReducer
 * Responsibility:  Reducer for the game state
 */

/**
 * gameStateReducer
 * @param {DebuggingState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {GameState}. New state.
 */
export function gameStateReducer(state: GameState = initState(), action: ActionPayload<any>): GameState {
    return produce(state, (draft) => {
        switch (action.type) {
            case "increaseScore":
                draft.score += action.payload;
                break;
            case "setLives":
                draft.lives = action.payload;
                break;
            case "addLife":
                draft.lives += 1;
                break;
            case "removeLife":
                draft.lives -= 1;
                break;
            case "setPhasers":
                draft.phasers = action.payload;
                break;
            case "addPhaser":
                draft.phasers += 1;
                break;
            case "removePhaser":
                draft.phasers--;
                break;
            case "addLevel":
                draft.level++;
                break;
            case "setLevel":
                draft.level = action.payload;
                break;
            case "nextLevel":
                if (draft.level === 42) {
                    draft.level = 1;
                } else {
                    draft.level++;
                }
                break;
            case "addLifeAndPhaser":
                draft.lives++;
                draft.phasers++;
                break;
        }
    });
}

/**
 * Initialize the state
 * @returns {GameState}. Fresh GameState.
 */
function initState(): GameState {
    return {
        level: 1,
        lives: 2,
        score: 0,
        phasers: 20, // Start with 0 phasers. One is rewarded each level so level 1 gives the player one phaser.
        showingLevelBanner: false
    };
}