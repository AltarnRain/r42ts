/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import Constants from "./Constants";
import GameState from "./GameState";
import { GameStateTypes } from "./Types";
import { WarpLevelComplexity, WarpLevelComplexties } from "./WarpLevelComplexity";

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
                draft.warpLevelComplexity = getWarpGateComplexity(action.payload);
                break;
            case Constants.nextLevel:
                if (draft.level === 42) {
                    draft.level = 1;
                } else if (draft.level !== undefined) {
                    draft.level++;
                }

                if (draft.level !== undefined) {
                    draft.warpLevelComplexity = getWarpGateComplexity(draft.level);
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

function getWarpGateComplexity(level: number): WarpLevelComplexity {
    if (level < 36) {
        const complexity = warpLevelComplexities[level.toString()];

        // If the complexity could not be found, return the highest
        // complexity. Should not happen while player, useful for debugging.
        if (complexity === undefined) {
            return warpLevelComplexities["36"];
        } else {
            return complexity;
        }
    } else {
        return warpLevelComplexities["36"];
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

/**
 * Typed constants that defined the warp gate complexities.
 */
const warpLevelComplexities: WarpLevelComplexties = {
    4: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 6, 8]
    },
    8: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 6, 6],
    },
    12: {
        stepsX: [0, 2, 2, 4],
        stepsY: [4, 4, 4, 6],
    },
    16: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2, 4, 4, 6],
    },
    20: {
        stepsX: [2, 2, 2, 4],
        stepsY: [2, 2, 4],
    },
    24: {
        stepsX: [2, 2, 2, 4],
        stepsY: [2, 2, 4],
    },
    28: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2, 4],
    },
    32: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2],
    },
    36: {
        stepsX: [2, 2, 4, 4],
        stepsY: [2],
    }
};