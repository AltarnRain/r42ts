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
import { appState, dispatch } from "../State/Store";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
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
const bulletDimensions = getFrameDimensions(playerBulletFrame, pixelSize);

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
            const newState = getParticleState(nextLoction.left, nextLoction.top, bulletDimensions.width, bulletDimensions.height, playerBulletSpeed);
            dispatch(setPlayerBulletState(newState));
        } else {
            dispatch(setPlayerBulletState(undefined));
        }
    }

    // Fire new bullet.
    if (playerState.playerNozzleLocation && keyboardState.fire && playerState.playerBulletState === undefined) {
        const nozzleLocation = playerState.playerNozzleLocation;

        const bullet = getParticleState(nozzleLocation.left, nozzleLocation.top, bulletDimensions.width, bulletDimensions.height, playerBulletSpeed);

        dispatch(setPlayerBulletState(bullet));
    }

    function getParticleState(left: number, top: number, width: number, height: number, speed: number, acceletation: number = 1): ParticleState {
        const bulletHitbox = getFrameHitbox(left, top, width, height, 0, 0);
        const bullet: ParticleState = {
            acceletation,
            angle: angles.up,
            frame: playerBulletFrame,
            hitbox: bulletHitbox,
            speed,
            left,
            top
        };

        return bullet;
    }
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
        renderFrame(bullet.left, bullet.top, bullet.frame);
    }
}