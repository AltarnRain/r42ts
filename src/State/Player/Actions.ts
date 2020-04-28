import PlayerBullet from "../../Player/PlayerBullet";
import PlayerShip from "../../Player/PlayerShip";
import { MoveLimits } from "../../Types/Types";
import Constants from "./Constants";
import { SetBullet, SetPlayer, SetPlayerMovementLimit, SetPlayerLeftLocation, SetPlayerTopLocation } from "./Types";

export function setPlayer(ship: PlayerShip | undefined): SetPlayer {
    return {
        type: Constants.setPlayer,
        payload: ship,
    };
}

export function setBullet(bullet: PlayerBullet | undefined): SetBullet {
    return {
        type: Constants.setBullet,
        payload: bullet,
    };
}

export function setPlayerMovementLimit(moveLimit: MoveLimits): SetPlayerMovementLimit {
    return {
        type: Constants.setPlayerMovementLimit,
        payload: moveLimit
    };
}

export function setPlayerLeftLocation(left: number): SetPlayerLeftLocation {
    return {
        type: Constants.setPlayerLeftLocation,
        payload: left,
    };
}

export function setPlayerTopLocation(top: number): SetPlayerTopLocation {
    return {
        type: Constants.setPlayerTopLocation,
        payload: top,
    };
}