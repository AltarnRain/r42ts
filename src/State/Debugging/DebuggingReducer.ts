/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import Constants from "./DebuggingConstants";
import DebuggingState from "./DebuggingState";
import { DebuggingTypes } from "./DebuggingTypes";

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
            case Constants.playerMortality:
                draft.playerIsImmortal = action.payload === "immortal";
                break;
            case Constants.renderPhaser:
                draft.renderPhaser = action.render;
                break;
            case Constants.hitboxes:
                draft.drawHitboxes = action.show;
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