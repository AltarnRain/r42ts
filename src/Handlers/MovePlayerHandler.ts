/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../Models/GameLocation";
import { getPlayerFrame } from "../Player/PlayerFrames";
import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayerLocationData } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { getAngle, getNextX, getNextY } from "../Utility/Geometry";

/**
 * Module:          MovePlayer
 * Responsibility:  Handles changes to the player location due to movement. Also provides a single source of truth for any class or module
 *                  That uses the player location or needs to change it.
 */

const {
    pixelSize,
    gameField
} = dimensionProvider();

// Used in player hitbox calculation, never changes so it can be a constant.
const doublePixel = pixelSize * 2;

const {
    width: playerWidth,
    height: playerHeight
} = getFrameDimensions(getPlayerFrame());

/**
 * Handles player movement.
 * @param {number} speed. Speed the ship can travel. Can vary depending on the level or if the player ship is forming.
 */
export function movePlayerHandler(speed: number): void {
    const { keyboardState, playerState } = appState();

    const localKeyboardState = { ...keyboardState };

    // By default the speed for x and y is the speed passed to the movement
    const speedX = speed;
    let speedY = speed;

    // Certain levels limit the movement of the player.
    // We'll use a fresh keyboardState object and make some adjustments.
    switch (playerState.moveLimit) {
        case "immobile":
            // Player cannot move
            return;
        case "sideways":
            // Used when the player forms. Override the keyboard state.
            localKeyboardState.down = localKeyboardState.up = false;
            break;
        case "forceup":
            // Used when the player travels through a warp gate.
            localKeyboardState.up = true;
            localKeyboardState.down = false;
            speedY = 4;
            break;
        case "none":
        // Make not changes and allow 360 degrees of freedown
        default:
        // No default;
    }

    const angle = getAngle(localKeyboardState);
    const { left: nextX, top: nextY } = getNextLocationForPlayer(angle, speedX, playerState.left, playerState.top);

    const hitBox = getFrameHitbox(nextX, nextY, playerState.coloredFrame, 0);

    const middleHitbox = { ...hitBox, left: hitBox.left + doublePixel, right: hitBox.right - doublePixel };
    const bottomHitbox = { ...hitBox, top: hitBox.top + doublePixel };

    const hitBoxes = { middle: middleHitbox, bottom: bottomHitbox };

    const nozzleLocation = {
        left: nextX + pixelSize * 2,
        top: nextY - pixelSize * 1,
    };

    dispatch(setPlayerLocationData(nextX, nextY, hitBoxes, nozzleLocation));
}

/**
 * Returns the next locatoin for the player taking into account, no movement and moving outside the game field.
 * @export
 * @param {number} angle
 * @param {number} speed
 * @param {number} currentX
 * @param {number} currentY
 * @returns {GameLocation}
 */
function getNextLocationForPlayer(angle: number, speed: number, currentX: number, currentY: number): GameLocation {
    const currentLocation = { left: currentX, top: currentY };
    if (angle === -1) {
        return currentLocation;
    }

    const nextX = getNextX(angle, speed, currentX);
    const nextY = getNextY(angle, speed, currentY);

    if (nextX < gameField.left || nextX + playerWidth > gameField.right) {
        return currentLocation;
    }

    if (nextY + playerHeight > gameField.bottom || nextY < gameField.top) {
        return currentLocation;
    }

    return {
        left: nextX,
        top: nextY,
    };
}