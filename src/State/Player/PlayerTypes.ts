/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Type definitions for action creator functions return type.
 */

import GameLocation from "../../Models/GameLocation";
import MoveLimits from "../../Types/MoveLimits";
import { ParticleState } from "../ParticleState";
import PlayerEnum from "./PlayerEnum";
import { PlayerHitboxes } from "./PlayerState";

export interface SetPlayerIsAlive {
    type: typeof PlayerEnum.setPlayerIsAlive;
    playerIsAlive: boolean;
}

export interface SetPlayerMovementLimit {
    type: typeof PlayerEnum.setPlayerMovementLimit;
    payload: MoveLimits;
}

export interface SetPlayerLocationData {
    type: typeof PlayerEnum.setPlayerLocationData;
    payload: {
        left: number;
        top: number;
        hitboxes?: PlayerHitboxes,
        nozzleLocation?: GameLocation,
    };
}

export interface SetPlayerBulletState {
    type: typeof PlayerEnum.setPlayerBulletState;
    particleState: ParticleState | undefined;
}

export type PlayerStateTypes =
    SetPlayerIsAlive |
    SetPlayerMovementLimit |
    SetPlayerLocationData |
    SetPlayerBulletState
    ;
