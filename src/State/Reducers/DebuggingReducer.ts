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

/**
 * debuggingReducer
 * @param {DebuggingState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {DebuggingState}. New state.
 */
export default function debuggingReducer(state: DebuggingState = initState(), action: ActionPayload<any>): DebuggingState {
    return produce(state, (draft) => {
        switch (action.type) {
            case "playerImmortal":
                draft.playerIsImmortal = true;
                break;
            case "playerMortal":
                draft.playerIsImmortal = false;
                break;
            case "renderPhaserOn":
                draft.renderPhaser = true;
                break;
            case "renderPhaserOff":
                draft.renderPhaser = false;
            case "hitboxesOn":
                draft.drawHitboxes = true;
                break;
            case "hitboxesOff":
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