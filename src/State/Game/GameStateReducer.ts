/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import Constants from "./Constants";
import GameState from "./GameState";
import { GameStateTypes } from "./Types";
import getWarpGateComplexity from "./WarpGameComplexities";
import { WarpLevelComplexity, WarpLevels } from "./WarpLevelTypes";

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
export default function gameStateReducer(state: GameState = initState(), action: GameStateTypes): GameState {
    return produce(state, (draft) => {
        switch (action.type) {
            case Constants.increaseScore:
                draft.score += action.payload;
                break;
            case Constants.setLives:
                draft.lives = action.payload;
                break;
            case Constants.addLife:
                draft.lives += 1;
                break;
            case Constants.removeLife:
                draft.lives -= 1;
                break;
            case Constants.setPhasers:
                draft.phasers = action.payload;
                break;
            case Constants.addPhaser:
                draft.phasers += 1;
                break;
            case Constants.removePhaser:
                draft.phasers--;
                break;
            case Constants.addLevel:
                if (draft.level) {
                    draft.level++;
                }
                break;
            case Constants.setLevel:
                draft.level = action.payload;
                draft.warpLevelComplexity = getWarpGateComplexityState(action.payload);
                break;
            case Constants.nextLevel:
                if (draft.level === 42) {
                    draft.level = 1;
                } else if (draft.level !== undefined) {
                    draft.level++;
                }

                if (draft.level !== undefined) {
                    draft.warpLevelComplexity = getWarpGateComplexityState(draft.level);
                }

                break;
            case Constants.addLifeAndPhaser:
                draft.lives++;
                draft.phasers++;
                break;
            case Constants.setPause:
                draft.pause = action.payload;
                break;
        }
    });

}

function getWarpGateComplexityState(level: number): WarpLevelComplexity | undefined {
    if (level < 36) {
        return getWarpGateComplexity(level);
    } else {
        return getWarpGateComplexity(36);
    }
}

/**
 * Initialize the state
 * @returns {GameState}. Fresh GameState.
 */
function initState(): GameState {
    return {
        level: undefined,
        lives: 0,
        score: 0,
        phasers: 0,
        pause: false,
        warpLevelComplexity: getWarpGateComplexity(4),
    };
}
