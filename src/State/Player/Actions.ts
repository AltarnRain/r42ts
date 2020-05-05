/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Action production functions for the PlayerState.
 */

import { GameLocation } from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { MoveLimits } from "../../Types";
import Constants from "./Constants";
import { ParticleState } from "./ParticleState";
import { PlayerOnScreen, SetPlayerBulletState, SetPlayerLocationData, SetPlayerMovementLimit } from "./Types";

export function setPlayerOnScreen(playerOnScreen: boolean): PlayerOnScreen {
    return {
        type: Constants.playerOnScreen,
        playerOnScreen,
    };
}

export function setPlayerMovementLimit(moveLimit: MoveLimits): SetPlayerMovementLimit {
    return {
        type: Constants.setPlayerMovementLimit,
        payload: moveLimit
    };
}

export function setPlayerLocationData(left: number, top: number, hitbox?: GameRectangle, nozzleLocation?: GameLocation): SetPlayerLocationData {
    return {
        type: Constants.setPlayerLocationData,
        payload: {
            left,
            top,
            hitbox,
            nozzleLocation
        }
    };
}

export function setPlayerBulletState(particleState: ParticleState | undefined): SetPlayerBulletState  {
    return {
        type: Constants.setPlayerBulletState,
        particleState,
    };
}