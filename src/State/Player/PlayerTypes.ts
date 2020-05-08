/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Type definitions for action creator functions return type.
 */

import { GameLocation } from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { MoveLimits } from "../../Types";
import { ParticleState } from "./ParticleState";
import Constants from "./PlayerConstants";
import { PlayerHitboxes } from "./PlayerState";

export interface SetPlayerIsAlive {
    type: typeof Constants.setPlayerIsAlive;
    playerIsAlive: boolean;
}

export interface SetPlayerMovementLimit {
    type: typeof Constants.setPlayerMovementLimit;
    payload: MoveLimits;
}

export interface SetPlayerLocationData {
    type: typeof Constants.setPlayerLocationData;
    payload: {
        left: number;
        top: number;
        hitboxes?: PlayerHitboxes,
        nozzleLocation?: GameLocation,
    };
}

export interface SetPlayerBulletState {
    type: typeof Constants.setPlayerBulletState;
    particleState: ParticleState | undefined;
}

export type PlayerStateTypes =
    SetPlayerIsAlive |
    SetPlayerMovementLimit |
    SetPlayerLocationData |
    SetPlayerBulletState
    ;
