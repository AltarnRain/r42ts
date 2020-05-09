/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          handlePlayerDeath
 * Responsibility:  Performs the required dispatches when the player dies.
 */

import { removeLife } from "../State/Game/GameActions";
import { setPlayerIsAlive } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import { dispatchExplosion } from "./DispatchExplosion";

/**
 * Handles a the player's death.
 * @param {number} tick
 */
export function handlePlayerDeath(tick: number): void {

    const { playerState: { left, top, coloredExplosion }, debuggingState } = appState();
    if (debuggingState.playerIsImmortal) {
        return;
    }

    dispatchExplosion(left, top, coloredExplosion, tick);

    dispatch(removeLife());
    dispatch(setPlayerIsAlive(false));
}