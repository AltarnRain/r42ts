/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Types for debugging state actions
 */

import Constants from "./DebuggingConstants";

export interface PlayerImmortal {
    type: typeof Constants.playerMortality;
    payload: "mortal" | "immortal";
}

export interface RenderPhaser {
    type: typeof Constants.renderPhaser;
    render: boolean;
}

export interface Hitboxes {
    type: typeof Constants.hitboxes;
    show: boolean;
}

export type DebuggingTypes =
    PlayerImmortal |
    RenderPhaser |
    Hitboxes
    ;
