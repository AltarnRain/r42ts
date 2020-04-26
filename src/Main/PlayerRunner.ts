/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import PlayerBullet from "../Player/PlayerBullet";
import PlayerBulletFrame from "../Player/PlayerBulletFrame";
import { appState, dispatch } from "../State/Store";
import { getFrameReturner } from "../Utility/Frame";
import GameLoop from "./GameLoop";

/**
 * Module:          PlayerRunner
 * Responsibility:  Module dedicated to managing player state.
 */

export default function playerRunner(): void {
    updateState();
    GameLoop.registerDraw(draw);
}

/**
 * Updates the player state.
 */
function updateState(): void {
    const { playerState, keyboardState } = appState();
    playerState.ship?.updateState();
    playerState.playerBullet?.updateState();

    // Remove objects no longer required.
    if (playerState.playerBullet?.traveling() === false) {
        dispatch<PlayerBullet>("setBullet", undefined);
    }

    // Fire new bullet.
    if (playerState.ship !== undefined && keyboardState.fire && playerState.playerBullet === undefined) {
        const nozzleLocation = playerState.ship.getNozzleLocation();

        dispatch<PlayerBullet>("setBullet", new PlayerBullet(nozzleLocation.left, nozzleLocation.top, getFrameReturner(PlayerBulletFrame[0]), 270, 42));
    }

    // Self destruct and firing a phaser are handled in the EnemeyLevelRunner. That's the only time either can be used.
}

/**
 * Draw the player and player bullet.
 */
function draw(): void {
    const { playerState } = appState();
    playerState.ship?.draw();
    playerState.playerBullet?.draw();
}