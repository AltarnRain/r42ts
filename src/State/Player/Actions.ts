/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Action production functions for the PlayerState.
 */

import PlayerBullet from "../../Player/PlayerBullet";
import PlayerShip from "../../Player/PlayerShip";
import { MoveLimits } from "../../Types";
import Constants from "./Constants";
import { SetBullet, SetPlayer, SetPlayerLocation, SetPlayerMovementLimit, RemovePlayerBullet, PlayerDied } from "./Types";

export function setPlayer(ship: PlayerShip): SetPlayer {
    return {
        type: Constants.setPlayer,
        payload: ship,
    };
}

export function setBullet(bullet: PlayerBullet): SetBullet {
    return {
        type: Constants.setBullet,
        payload: bullet,
    };
}

export function removePlayerBullet(): RemovePlayerBullet {
    return {
        type: Constants.removePlayerBullet,
    };
}

export function playerDied(): PlayerDied {
    return {
        type: Constants.playerDied
    };
}

export function setPlayerMovementLimit(moveLimit: MoveLimits): SetPlayerMovementLimit {
    return {
        type: Constants.setPlayerMovementLimit,
        payload: moveLimit
    };
}

export function setPlayerLocation(left: number, top: number): SetPlayerLocation {
    return {
        type: Constants.setPlayerLocation,
        left,
        top
    };
}