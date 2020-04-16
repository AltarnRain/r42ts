/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import ActionPayload from "../ActionPayLoad";
import PlayerState from "../Definition/PlayerState";
import GameActions from "../GameActions";

/**
 * Module:          playerReducer
 * Responsibility:  Handles the player's state.
 */

export default function playerReducer(state: PlayerState = initState(), action: ActionPayload<any>): PlayerState {
    return produce(state, (draft) => {
        switch (action.type) {
            case GameActions.setLives:
                draft.lives = action.payload;
                break;
            case GameActions.addLife:
                draft.lives += 1;
                break;
            case GameActions.removeLife:
                draft.lives -= 1;
                break;
            case GameActions.setPlayer:
                draft.player = action.payload;
                break;

            case GameActions.setBullet:
                draft.playerBullet = action.payload;
                break;
            case GameActions.setPlayerFormationPhase:
                draft.playerFormationPhase = action.payload;
                break;
            case GameActions.increaseScore:
                draft.score += action.payload;
                break;
        }
    });
}

/**
 * Initialize the base player state.
 */
function initState(): PlayerState {
    return {
        lives: 2,
        phaserCount: 1,
        player: undefined,
        playerBullet: undefined,
        playerFormationPhase: "begin",
        score: 0,
    };
}
