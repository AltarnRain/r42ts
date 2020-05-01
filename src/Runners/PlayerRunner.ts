/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import { playerBulletSpeed } from "../Constants/BulletSpeeds";
import GameLoop from "../GameLoop";
import Guard from "../Guard";
import AcceleratingLocationProvider from "../LocationProviders/AcceleratingLocationProvider";
import PlayerBullet from "../Player/PlayerBullet";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { setBullet, removePlayerBullet } from "../State/Player/Actions";
import { appState, dispatch } from "../State/Store";

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
    const {
        gameState
    } = appState();

    if (gameState.pause) {
        return;
    }

    const { playerState, keyboardState } = appState();
    playerState.ship?.updateState();
    playerState.playerBullet?.updateState();

    // Remove objects no longer required.
    if (playerState.playerBullet?.traveling() === false) {
        dispatch(removePlayerBullet());
    }

    // Fire new bullet.
    if (Guard.isPlayerAlive(playerState.ship) && keyboardState.fire && playerState.playerBullet === undefined) {
        const nozzleLocation = playerState.ship.getNozzleLocation();

        const locationProvider = new AcceleratingLocationProvider(nozzleLocation.left, nozzleLocation.top, playerBulletSpeed, angles.up, 1);
        dispatch(setBullet(new PlayerBullet(locationProvider, getTwoPixelBullet)));
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