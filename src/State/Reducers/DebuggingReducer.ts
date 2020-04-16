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
            case GameActions.togglePlayerImmortality:
                draft.playerIsImmortal = !draft.playerIsImmortal;
                break;
            case GameActions.toggleRenderPhaser:
                draft.renderPhaser = !draft.renderPhaser;
                break;
            case GameActions.toggleHitboxes:
                draft.renderPhaser = !draft.renderPhaser;
                break;
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