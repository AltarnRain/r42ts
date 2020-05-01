/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import getShipSpawnLocation from "../../Providers/PlayerSpawnLocationProvider";
import Constants from "./Constants";
import PlayerState from "./PlayerState";
import { PlayerStateTypes } from "./Types";

/**
 * Module:          playerReducer
 * Responsibility:  Handles the player's state.
 */

/**
 * playerReducer
 * @param {PlayerState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {PlayerState}. New state.
 */
export default function playerReducer(state: PlayerState = initState(), action: PlayerStateTypes): PlayerState {
    return produce(state, (draft) => {
        switch (action.type) {
            case Constants.setPlayer:
                draft.ship = action.payload;
                break;
            case Constants.setBullet:
                draft.playerBullet = action.payload;
                break;
            case Constants.setPlayerMovementLimit:
                draft.moveLimit = action.payload;
                break;
            case Constants.setPlayerLocation:
                draft.playerLeftLocation = action.left;
                draft.playerTopLocation = action.top;
                break;
            case Constants.removePlayerBullet:
                draft.playerBullet = undefined;
                break;
            case Constants.playerDied:
                draft.ship = undefined;
                break;
        }
    });
}

/**
 * Initialize the base player state.
 * @returns {PlayerState}
 */
function initState(): PlayerState {

    const spawnLocation = getShipSpawnLocation();
    return {
        ship: undefined,
        playerBullet: undefined,
        moveLimit: "none",
        playerLeftLocation: spawnLocation.left,
        playerTopLocation: spawnLocation.top,
    };
}
