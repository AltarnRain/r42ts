/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../../Models/GameLocation";
import PlayerBullet from "../../Player/PlayerBullet";
import PlayerShip from "../../Player/PlayerShip";
import { MoveLimits } from "../../Types/Types";

/**
 * Module:          PlayerState
 * Responsibility:  Holds all the state relevant to the player
 */

export default interface PlayerState {
    /**
     * Reference to the player object.
     */
    ship: PlayerShip | undefined;

    /**
     * Quick reference to the player bullet.
     */
    playerBullet: PlayerBullet | undefined;

    /**
     * Movement limitations for the player
     */
    moveLimit: MoveLimits;

    /**
     * Location of the player
     */
    playerLocation: GameLocation;
}
