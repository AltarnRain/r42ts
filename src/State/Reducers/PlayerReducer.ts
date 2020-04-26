/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import getShipSpawnLocation from "../../Providers/PlayerSpawnLocationProvider";
import ActionPayload from "../ActionPayLoad";
import PlayerState from "../Definition/PlayerState";

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
export default function playerReducer(state: PlayerState = initState(), action: ActionPayload<any>): PlayerState {
    return produce(state, (draft) => {
        switch (action.type) {
            case "setPlayer":
                draft.ship = action.payload;
                break;
            case "setBullet":
                draft.playerBullet = action.payload;
                break;
            case "setPlayerMovementLimit":
                draft.moveLimit = action.payload;
                break;
            case "setPlayerLeftLocation":
                draft.playerLeftLocation = action.payload;
                break;
            case "setPlayerTopLocation":
                draft.playerTopLocation = action.payload;
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
