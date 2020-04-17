/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import ActionPayload from "../ActionPayLoad";
import DebuggingState from "../Definition/DebuggingState";
import GameActions from "../GameActions";

/**
 * Module:          debuggingReducer
 * Responsibility:  Handles the debugging state.
 */

export default function debuggingReducer(state: DebuggingState = initState(), action: ActionPayload<any>): DebuggingState {
    return produce(state, (draft) => {
        switch (action.type) {
            case GameActions.playerImmortal:
                draft.playerIsImmortal = true;
                break;
            case GameActions.playerMortal:
                draft.playerIsImmortal = false;
                break;
            case GameActions.renderPhaserOn:
                draft.renderPhaser = true;
                break;
            case GameActions.renderPhaserOff:
                draft.renderPhaser = false;
            case GameActions.hitboxesOn:
                draft.drawHitboxes = true;
                break;
            case GameActions.hitboxesOff:
                draft.drawHitboxes = false;
        }
    });
}

/**
 * Initialize the debugging state.
 * @returns {DebuggingState}. Default state.
 */
function initState(): DebuggingState {
    return {
        drawHitboxes: false,
        playerIsImmortal: false,
        renderPhaser: false,
    };
}