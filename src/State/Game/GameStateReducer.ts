/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import GameStateEnum from "./GameEnum";
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
            case GameStateEnum.increaseScore:
                draft.score += action.payload;
                break;
            case GameStateEnum.setLives:
                draft.lives = action.payload;
                break;
            case GameStateEnum.removeLife:
                draft.lives -= 1;
                break;
            case GameStateEnum.setPhasers:
                draft.phasers = action.payload;
                break;
            case GameStateEnum.addPhaser:
                draft.phasers += 1;
                break;
            case GameStateEnum.removePhaser:
                draft.phasers--;
                break;
            case GameStateEnum.setLevel:
                draft.level = action.payload;
                break;
            case GameStateEnum.nextLevel:
                if (draft.level === 42) {
                    draft.hardMode = true;
                    draft.level = 1;
                } else if (draft.level !== undefined) {
                    draft.level++;
                }

                break;
            case GameStateEnum.addLifeAndPhaser:
                draft.lives++;
                draft.phasers++;
                draft.lastAwardScore = draft.score;
                break;
            case GameStateEnum.setPause:
                draft.pause = action.payload;
                break;
            case GameStateEnum.setWarpLevelComplexity:
                draft.warpLevelSteps = getWarpGateComplexity(action.complexity);
                break;
            case GameStateEnum.gameOver:
                draft.gameOver = true;
                break;
            case GameStateEnum.resetGameState:
                draft.gameOver = false;
                draft.phasers = 1;
                draft.lives = 2;
                draft.level = 1;
                draft.bulletsFired = 0;
                draft.enemiesHit = 0;
                draft.lastAwardScore = 0;
                break;
            case GameStateEnum.enemyHit:
                draft.enemiesHit++;
                break;

            case GameStateEnum.bulletFired:
                draft.bulletsFired++;
                break;
            case GameStateEnum.setTimeLevelTimeLimit:
                // Used to debug the game and not spend 20 seconds waiting
                draft.timeLevelTimeLimit = action.limit;
                break;
            case GameStateEnum.resetScore:
                // Score is reset when the player self destructs.
                draft.score = 0;
                draft.lastAwardScore = 0;
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
        lastAwardScore: 0,
        phasers: 1,
        pause: false,
        warpLevelSteps: getWarpGateComplexity(0),
        gameOver: false,
        bulletsFired: 0,
        enemiesHit: 0,
        timeLevelTimeLimit: 20000, // 20 seconds
        hardMode: false
    };
}
