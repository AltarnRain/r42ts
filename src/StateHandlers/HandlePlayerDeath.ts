/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          handlePlayerDeath
 * Responsibility:  Performs the required dispatches when the player dies.
 */

import { removeLife, setPhasers } from "../State/Game/GameActions";
import { setPlayerBulletState, setPlayerIsAlive } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import { dispatchExplosion } from "./DispatchExplosion";

/**
 * Handles a the player's death.
 * @param {number} tick
 */
export function handlePlayerDeath(tick: number): void {

    const { playerState: { left, top, coloredExplosion }, debuggingState, enemyLevelState: {enemies, totalNumberOfEnemies} } = appState();

    // Don't let the player die once they've killed all enemies.
    if (debuggingState.playerIsImmortal || enemies.length === 0 && totalNumberOfEnemies > 0) {
        return;
    }

    dispatchExplosion(left, top, coloredExplosion, tick);

    dispatch(removeLife());
    dispatch(setPlayerIsAlive(false));
    dispatch(setPlayerBulletState(undefined));
    dispatch(setPhasers(1));
}