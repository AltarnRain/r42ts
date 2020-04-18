/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import ActionPayload from "../ActionPayLoad";
import { GameState } from "../Definition/GameState";
import GameActions from "../GameActions";

/**
 * Module:          GameStateReducer
 * Responsibility:  Reducer for the game state
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
        }
    });
}

function initState(): GameState {
    return {
        level: 1,
        lives: 2,
        score: 0,
        phasers: 2,
    };
}