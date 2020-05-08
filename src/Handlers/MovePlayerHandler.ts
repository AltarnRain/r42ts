/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayerLocationData } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import { getFrameHitbox } from "../Utility/Frame";
import { getAngle, getNextX, getNextY } from "../Utility/Geometry";
import { fallsWithinGameField } from "../Utility/Location";

/**
 * Module:          MovePlayer
 * Responsibility:  Handles changes to the player location due to movement. Also provides a single source of truth for any class or module
 *                  That uses the player location or needs to change it.
 */

const {
    pixelSize,
} = dimensionProvider();

// Used in player hitbox calculation, never changes so it can be a constant.
const doublePixel = pixelSize * 2;

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

    let newX = playerState.left;
    let newY = playerState.top;
    let hitBoxes = playerState.hitboxes;

    if (angle !== -1) {

        newX = getNextX(angle, speedX, playerState.left);
        newY = getNextY(angle, speedY, playerState.top);
        const hitBox = getFrameHitbox(newX, newY, playerState.coloredFrame, 0);

        // We only need one hitbox to determine if the player left the field, a simple rect suffices.
        if (!fallsWithinGameField(hitBox.left, hitBox.right, hitBox.top, hitBox.bottom)) {

            // A hitbox that envlops the middle part of the ship.
            const middleHitbox = { ...hitBox, left: hitBox.left + doublePixel, right: hitBox.right - doublePixel };

            // A hitbox that envelops the bottom part of the ship.
            const bottomHitbox = { ...hitBox, top: hitBox.top + doublePixel };

            hitBoxes = {
                middle: middleHitbox,
                bottom: bottomHitbox,
            };

            newX = playerState.left;
            newY = playerState.top;
        }
    }

    const nozzleLocation = {
        left: newX + pixelSize * 2,
        top: newY - pixelSize * 1,
    };

    dispatch(setPlayerLocationData(newX, newY, hitBoxes, nozzleLocation));
}