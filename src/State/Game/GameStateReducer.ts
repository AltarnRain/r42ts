/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import Constants from "./GameConstants";
import GameState from "./GameState";
import { GameStateTypes } from "./GameTypes";
import getWarpGateComplexity from "./WarpGateComplexities";

/**
 * Module:          GameStateReducer
 * Responsibility:  Reducer for the game state
 */

/**
 * gameStateReducer
 * @param {DebuggingState} state. The current state.
 * @param {GameStateTypes} action. The desired action with optional paylood.
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
                break;
            case Constants.nextLevel:
                if (draft.level === 42) {
                    draft.level = 1;
                } else if (draft.level !== undefined) {
                    draft.level++;
                }

                break;
            case Constants.addLifeAndPhaser:
                draft.lives++;
                draft.phasers++;
                break;
            case Constants.setPause:
                draft.pause = action.payload;
                break;
            case Constants.setWarpLevelComplexity:
                draft.warpLevelSteps = getWarpGateComplexity(action.complexity);
                break;
            case Constants.gameOver:
                draft.gameOver = true;
                break;
            case Constants.gameStart:
                draft.gameOver = false;
                draft.phasers = 1;
                draft.lives = 2;
                draft.level = 1;
                draft.bulletsFired = 0;
                draft.enemiesHit = 0;
                draft.phasersFired = 0;
                break;
            case Constants.enemyHit:
                draft.enemiesHit++;
                break;
            case Constants.phasersFired:
                draft.phasersFired++;
                break;
            case Constants.bulletFired:
                draft.bulletsFired++;
                break;
            case Constants.setTimeLevelTimeLimit:
                // Used to debug the game and not spend 20 seconds waiting
                draft.timeLevelTimeLimit = action.limit;
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
        level: 0,
        lives: 0,
        score: 0,
        phasers: 0,
        pause: false,
        warpLevelSteps: getWarpGateComplexity(0),
        gameOver: false,
        bulletsFired: 0,
        enemiesHit: 0,
        phasersFired: 0,
        timeLevelTimeLimit: 20000 // 20 seconds
    };
}
