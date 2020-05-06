/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../Constants/Angles";
import { playerBulletSpeed } from "../Constants/BulletSpeeds";
import CGAColors from "../Constants/CGAColors";
import GameLoop from "../GameLoop";
import { movePlayerHandler } from "../Handlers/MovePlayerHandler";
import dimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { setPlayerBulletState } from "../State/Player/Actions";
import { ParticleState } from "../State/Player/ParticleState";
import { StateProviders } from "../State/StateProviders";
import { appState, dispatch } from "../State/Store";
import { fallsWithin, getLocation } from "../Utility/Location";

/**
 * Module:          PlayerRunner
 * Responsibility:  Module dedicated to managing player state.
 */

export default function playerRunner(): void {
    updateState();
    GameLoop.registerDraw(draw);
}

const {
    pixelSize,
    gameField
} = dimensionProvider();

const playerBulletFrame = getTwoPixelBullet(CGAColors.yellow);

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

    if (playerState.playerBulletState) {
        const bullet = playerState.playerBulletState;
        const nextLoction = getLocation(bullet.left, bullet.top, bullet.angle, bullet.speed);

        if (fallsWithin(nextLoction.left, nextLoction.top, gameField.top, gameField.bottom, 0, gameField.right)) {
            const newState = getPlayerBullet(nextLoction.left, nextLoction.top);
            dispatch(setPlayerBulletState(newState));
        } else {
            dispatch(setPlayerBulletState(undefined));
        }
    }

    // Fire new bullet.
    if (playerState.playerNozzleLocation !== undefined && keyboardState.fire && playerState.playerBulletState === undefined) {
        const nozzleLocation = playerState.playerNozzleLocation;
        const bullet = getPlayerBullet(nozzleLocation.left, nozzleLocation.top);
        dispatch(setPlayerBulletState(bullet));
    }
}

function getPlayerBullet(left: number, top: number): ParticleState {
    return StateProviders.getParticleState(left, top, playerBulletSpeed, angles.up, playerBulletFrame, 1, -0.5 * pixelSize, -0.5 * pixelSize);
}

/**
 * Draw the player and player bullet.
 */
function draw(): void {
    const { playerState } = appState();
    if (playerState.playerOnScreen) {
        renderFrame(playerState.playerLeftLocation, playerState.playerTopLocation, playerState.playerFrame);
    }

    if (playerState.playerBulletState) {
        const bullet = playerState.playerBulletState;
        renderFrame(bullet.left, bullet.top, bullet.coloredFrame);
    }
}