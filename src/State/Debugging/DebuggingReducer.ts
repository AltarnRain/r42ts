/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import Constants from "./Constants";
import DebuggingState from "./DebuggingState";
import { DebuggingTypes } from "./Types";

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
export default function debuggingReducer(state: DebuggingState = initState(), action: DebuggingTypes): DebuggingState {
    return produce(state, (draft) => {
        switch (action.type) {
            case Constants.playerImmortal:
                draft.playerIsImmortal = true;
                break;
            case Constants.playerMortal:
                draft.playerIsImmortal = false;
                break;
            case Constants.renderPhaserOn:
                draft.renderPhaser = true;
                break;
            case Constants.renderPhaserOff:
                draft.renderPhaser = false;
                break;
            case Constants.hitboxesOn:
                draft.drawHitboxes = true;
                break;
            case Constants.hitboxesOff:
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