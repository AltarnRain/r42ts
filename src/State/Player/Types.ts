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
import Constants from "./Constants";

export interface PlayerOnScreen {
    type: typeof Constants.playerOnScreen;
    playerOnScreen: boolean;
}

export interface PlayerBulletOnScreen {
    type: typeof Constants.playerBulletOnScreen;
    playerBulletOnScreen: boolean;
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
        hitbox?: GameRectangle,
        nozzleLocation?: GameLocation,
    };
}

export interface SetPlayerBulletHitbox {
    type: typeof Constants.setPlayerBulletHitbox;
    hitbox: GameRectangle;
}

export type PlayerStateTypes =
    PlayerOnScreen |
    PlayerBulletOnScreen |
    SetPlayerMovementLimit |
    SetPlayerLocationData |
    SetPlayerBulletHitbox
    ;
