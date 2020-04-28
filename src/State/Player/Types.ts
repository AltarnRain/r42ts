import PlayerBullet from "../../Player/PlayerBullet";
import PlayerShip from "../../Player/PlayerShip";
import { MoveLimits } from "../../Types/Types";
import Constants from "./Constants";

export interface SetPlayer {
    type: typeof Constants.setPlayer;
    payload: PlayerShip | undefined;
}

export interface SetBullet {
    type: typeof Constants.setBullet;
    payload: PlayerBullet | undefined;
}

export interface SetPlayerMovementLimit {
    type: typeof Constants.setPlayerMovementLimit;
    payload: MoveLimits;
}

export interface SetPlayerLocation {
    type: typeof Constants.setPlayerLocation;
    left: number;
    top: number;
}

export type PlayerStateTypes =
    SetPlayer |
    SetBullet |
    SetPlayerMovementLimit |
    SetPlayerLocation
    ;
