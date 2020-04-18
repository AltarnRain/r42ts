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

export default function playerReducer(state: PlayerState = initState(), action: ActionPayload<any>): PlayerState {
    return produce(state, (draft) => {
        switch (action.type) {
            case "setPlayer":
                draft.ship = action.payload;
                break;
            case "setBullet":
                draft.playerBullet = action.payload;
                break;
            case "setPlayerFormationPhase":
                draft.playerFormationPhase = action.payload;
                break;
            case "setPlayerMovementLimit":
                draft.moveLimit = action.payload;
                break;
            case "setPlayerLocation":
                draft.playerLocation = { ...action.payload };
                break;
        }
    });
}

/**
 * Initialize the base player state.
 */
function initState(): PlayerState {
    return {
        ship: undefined,
        playerBullet: undefined,
        playerFormationPhase: undefined,
        moveLimit: "none",
        playerLocation: getShipSpawnLocation(),
    };
}
