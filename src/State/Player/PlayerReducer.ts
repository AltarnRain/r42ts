/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import produce from "immer";
import getPlayerExplosion from "../../Player/PlayerExplosion";
import { getPlayerFrame } from "../../Player/PlayerFrames";
import dimensionProvider from "../../Providers/DimensionProvider";
import getShipSpawnLocation from "../../Providers/PlayerSpawnLocationProvider";
import { getFrameDimensions, getFrameHitbox } from "../../Utility/Frame";
import Mutators from "../../Utility/FrameMutators";
import Constants from "./Constants";
import PlayerState from "./PlayerState";
import { PlayerStateTypes } from "./Types";

/**
 * Module:          playerReducer
 * Responsibility:  Handles the player's state.
 */

const {
    pixelSize,
} = dimensionProvider();

const shipDimensions = getFrameDimensions(getPlayerFrame(), pixelSize);

/**
 * playerReducer
 * @param {PlayerState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {PlayerState}. New state.
 */
export default function playerReducer(state: PlayerState = initState(), action: PlayerStateTypes): PlayerState {
    return produce(state, (draft) => {
        switch (action.type) {
            case Constants.playerOnScreen:
                draft.playerOnScreen = action.playerOnScreen;
                break;
            case Constants.setPlayerMovementLimit:
                draft.moveLimit = action.payload;
                break;
            case Constants.setPlayerLocationData:
                draft.playerLeftLocation = action.payload.left;
                draft.playerTopLocation = action.payload.top;
                draft.playerHitbox = action.payload.hitbox;
                draft.playerNozzleLocation = action.payload.nozzleLocation;
                break;
            case Constants.setPlayerBulletState:
                draft.playerBulletState = action.particleState;
                break;
        }
    });
}

/**
 * Initialize the base player state.
 * @returns {PlayerState}
 */
function initState(): PlayerState {
    const playerExplosion = getPlayerExplosion();
    Mutators.Frame.convertHexToCGA(playerExplosion.explosionCenterFrame);

    playerExplosion.particleFrames.forEach((p) => Mutators.Frame.convertHexToCGA(p));

    const spawnLocation = getShipSpawnLocation();

    const playerFrame = getPlayerFrame();
    Mutators.Frame.convertHexToCGA(playerFrame);

    return {
        playerOnScreen: false,
        moveLimit: "none",
        playerLeftLocation: spawnLocation.left,
        playerTopLocation: spawnLocation.top,
        playerHitbox: { left: 0, top: 0, right: 0, bottom: 0 },
        playerNozzleLocation: { left: 0, top: 0 },
        playerExplosion,
        playerFrame,
        playerBulletState: undefined,
    };
}