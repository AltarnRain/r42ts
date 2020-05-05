/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import { playerBulletSpeed } from "../Constants/BulletSpeeds";
import GameLoop from "../GameLoop";
import { movePlayerHandler } from "../Handlers/MovePlayerHandler";
import AcceleratingLocationProvider from "../LocationProviders/AcceleratingLocationProvider";
import PlayerBullet from "../Player/PlayerBullet";
import { getPlayerFrame } from "../Player/PlayerFrames";
import renderFrame from "../Render/RenderFrame";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { setPlayerBulletOnScreen } from "../State/Player/Actions";
import { appState, dispatch } from "../State/Store";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          PlayerRunner
 * Responsibility:  Module dedicated to managing player state.
 */

export default function playerRunner(): void {
    updateState();
    GameLoop.registerDraw(draw);
}

let playerBullet: PlayerBullet | undefined;

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
    movePlayerHandler(10);
    playerBullet?.updateState();

    // Remove objects no longer required.
    if (playerBullet?.traveling() === false) {
        playerBullet = undefined;
        dispatch(setPlayerBulletOnScreen(false));
    }

    // Fire new bullet.
    if (playerState.playerNozzleLocation && keyboardState.fire && !playerState.playerBulletOnScreen) {
        const nozzleLocation = playerState.playerNozzleLocation;

        const locationProvider = new AcceleratingLocationProvider(nozzleLocation.left, nozzleLocation.top, playerBulletSpeed, angles.up, 1);
        playerBullet = new PlayerBullet(locationProvider, getTwoPixelBullet);
        dispatch(setPlayerBulletOnScreen(true));
    }

    // Self destruct and firing a phaser are handled in the EnemeyLevelRunner. That's the only time either can be used.
}

/**
 * Draw the player and player bullet.
 */
function draw(): void {
    const { playerState } = appState();
    if (playerState.playerOnScreen) {
        renderFrame(playerState.playerLeftLocation, playerState.playerTopLocation, playerState.playerFrame);
    }

    playerBullet?.draw();
}