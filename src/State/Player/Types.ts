import PlayerBullet from "../../Player/PlayerBullet";
import PlayerShip from "../../Player/PlayerShip";
import Constants from "./Constants";
import { MoveLimits } from "../../Types/Types";

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

export interface SetPlayerLeftLocation {
    type: typeof Constants.setPlayerLeftLocation;
    payload: number;
}

export interface SetPlayerTopLocation {
    type: typeof Constants.setPlayerTopLocation;
    payload: number;
}

export type PlayerStateTypes = 
    SetPlayer |
    SetBullet |
    SetPlayerMovementLimit |
    SetPlayerLeftLocation |
    SetPlayerTopLocation
    ;
