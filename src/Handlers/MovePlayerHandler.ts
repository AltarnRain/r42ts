/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { getPlayerFrame } from "../Player/PlayerFrames";
import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayerLocationData } from "../State/Player/Actions";
import { appState, dispatch } from "../State/Store";
import { getFrameDimensions, getFrameHitbox } from "../Utility/Frame";
import { getAngle, getNextX, getNextY } from "../Utility/Geometry";
import { fallsWithin } from "../Utility/Location";

/**
 * Module:          MovePlayer
 * Responsibility:  Handles changes to the player location due to movement. Also provides a single source of truth for any class or module
 *                  That uses the player location or needs to change it.
 */

const {
    pixelSize,
    gameField,
} = dimensionProvider();

const shipDimensions = getFrameDimensions(getPlayerFrame(), pixelSize);

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

    let newX = playerState.playerLeftLocation;
    let newY = playerState.playerTopLocation;

    if (angle !== -1) {

        newX = getNextX(angle, speedX, playerState.playerLeftLocation);
        newY = getNextY(angle, speedY, playerState.playerTopLocation);

        if (!fallsWithin(newX, newY, gameField.top, gameField.bottom - shipDimensions.height, gameField.left, gameField.right - shipDimensions.width)) {
            newX = playerState.playerLeftLocation;
            newY = playerState.playerTopLocation;
        }
    }

    const hitBox = getFrameHitbox(newX, newY, playerState.coloredFrame,  0);
    const nozzleLocation =  {
        left: newX + pixelSize * 2,
        top: newY - pixelSize * 1,
    };

    dispatch(setPlayerLocationData(newX, newY, hitBox, nozzleLocation));
}