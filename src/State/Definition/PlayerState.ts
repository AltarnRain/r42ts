/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Player from "../../Player/Player";
import PlayerBullet from "../../Player/PlayerBullet";

/**
 * Module:          PlayerState
 * Responsibility:  Holds all the state relevant to the player
 */

export default interface PlayerState {
    /**
     * Reference to the player object.
     */
    player: Player | undefined;

    /**
     * Quick reference to the player bullet.
     */
    playerBullet: PlayerBullet | undefined;

    /**
     * Flag if the player's ship is forming after death.
     */
    playerFormationPhase: "begin" | "inprogress" | undefined;

}
