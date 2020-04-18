/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import PlayerBullet from "../../Player/PlayerBullet";
import PlayerShip from "../../Player/PlayerShip";

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
     * Flag if the player's ship is forming after death.
     */
    playerFormationPhase: "begin" | "inprogress" | undefined;

}
