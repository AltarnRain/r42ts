/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ActionPayload from "../ActionPayLoad";
import GameActions from "../GameActions";

/**
 * Module:          DebuggerActionDispensers.
 * Responsibility:  Dispatch actions to the store in regards to debugging.
 */

export function playerImmortality(action: "on" | "off"): ActionPayload<any> {
    return {
        type: action === "on" ? GameActions.playerImmortal : GameActions.playerMortal,
    };
}

export function renderPhaser(action: "on" | "off"): ActionPayload<any> {
    return {
        type: action === "on" ? GameActions.renderPhaserOn : GameActions.renderPhaserOff,
    };
}

export function drawHitboxes(action: "on" | "off"): ActionPayload<any> {
    return {
        type: action === "on" ? GameActions.hitboxesOn : GameActions.hitboxesOff,
    };
}