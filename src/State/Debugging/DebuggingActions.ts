/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Actions for Debugging state.
 */

import Constants from "./DebuggingConstants";
import { PlayerImmortal, RenderPhaser } from "./DebuggingTypes";

export function playerMortality(mortality: "mortal" | "immortal"): PlayerImmortal {
    return {
        type: Constants.playerMortality,
        payload: mortality,
    };
}

export function renderPhaserOn(render: boolean): RenderPhaser {
    return {
        type: Constants.renderPhaser,
        render
    };
}