/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { getPlayerFrame } from "../Player/PlayerFrames";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState, dispatch } from "../State/Store";
import { getFrameDimensions } from "../Utility/Frame";
import { getAngle } from "../Utility/Geometry";
import { fallsWithin, getLocation } from "../Utility/Location";

/**
 * Module:          MovePlayer
 * Responsibility:  Handles changes to the player location due to movement. Also provides a single source of truth for any class or module
 *                  That uses the player location or needs to change it.
 */

const {
    gameFieldTop,
    averagePixelSize,
    fullHeight,
    fullWidth,
} = dimensionProvider();

const shipDimensions = getFrameDimensions(getPlayerFrame(), averagePixelSize);
const maxBottom = fullHeight - shipDimensions.height - averagePixelSize / 2;
const maxRight = fullWidth - shipDimensions.width;

/**
 * Handles player movement.
 * @param {number} speed. Speed the ship can travel. Can vary depending on the level or if the player ship is forming.
 */
export function movePlayer(speed: number): void {
    const { keyboardState, playerState } = appState();

    const localKeyboardState = { ...keyboardState };

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
            break;
        case "none":
        // Make not changes and allow 360 degrees of freedown
        default:
        // No default;
    }

    const angle = getAngle(localKeyboardState);
    if (angle !== -1) {
        const newLocation = getLocation(playerState.playerLeftLocation, playerState.playerTopLocation, angle, speed);
        if (fallsWithin(newLocation.left, newLocation.top, gameFieldTop, maxBottom, 0, maxRight)) {
            dispatch("setPlayerLeftLocation", newLocation.left);
            dispatch("setPlayerTopLocation", newLocation.top);
        }
    }
}