/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Action production functions for the PlayerState.
 */

import GameLocation from "../../Models/GameLocation";
import MoveLimits from "../../Types/MoveLimits";
import { ParticleState } from "../ParticleState";
import PlayerEnum from "./PlayerEnum";
import { PlayerHitboxes } from "./PlayerState";
import { SetPlayerBulletState, SetPlayerIsAlive, SetPlayerLocationData, SetPlayerMovementLimit } from "./PlayerTypes";

export function setPlayerIsAlive(playerAlive: boolean): SetPlayerIsAlive {
    return {
        type: PlayerEnum.setPlayerIsAlive,
        playerIsAlive: playerAlive,
    };
}

export function setPlayerMovementLimit(moveLimit: MoveLimits): SetPlayerMovementLimit {
    return {
        type: PlayerEnum.setPlayerMovementLimit,
        payload: moveLimit
    };
}

export function setPlayerLocationData(left: number, top: number, hitboxes?: PlayerHitboxes, nozzleLocation?: GameLocation): SetPlayerLocationData {
    return {
        type: PlayerEnum.setPlayerLocationData,
        payload: {
            left,
            top,
            hitboxes,
            nozzleLocation
        }
    };
}

export function setPlayerBulletState(particleState: ParticleState | undefined): SetPlayerBulletState  {
    return {
        type: PlayerEnum.setPlayerBulletState,
        particleState,
    };
}