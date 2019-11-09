/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DimensionReducer
 * Responsibility:  Provides the dimensions
 */

import produce from "immer";
import ActionPayload from "../ActionPayload";
import { GameActions } from "../GameActions";
import DimensionState from "./DimensionState";

export const DimensionReducer = (state: DimensionState = init(), action: ActionPayload): DimensionState => {

    switch (action.type) {
        case GameActions.setDimensions:
            return produce(state, (draft) => {
                draft.width = action.payload.width;
                draft.height = action.payload.height;
            });
    }
};

const init = (): DimensionState => {
    return {
        width: 0,
        height: 0,
    };
};
