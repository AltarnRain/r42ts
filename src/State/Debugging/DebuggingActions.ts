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
import { Hitboxes, PlayerImmortal as PlayerMortality, RenderPhaser } from "./DebuggingTypes";

export function playerMortality(mortality: "mortal" | "immortal"): PlayerMortality {
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

export function hitboxesOn(show: boolean): Hitboxes {
    return {
        type: Constants.hitboxes,
        show
    };
}