/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { PlayerFrame } from "../Player/PlayerFrames";
import DimensionProvider from "../Providers/DimensionProvider";
import { MoveLimits } from "../Types/Types";
import { getFrameDimensions } from "../Utility/Frame";
import { getAngle } from "../Utility/Geometry";
import { fallsWithin, getLocation } from "../Utility/Location";
import { appState } from "../State/Store";

/**
 * Module:          PlayerLocationHandler
 * Responsibility:  Handles changes to the player location due to movement. Also provides a single source of truth for any class or module
 *                  That uses the player location or needs to change it.
 */

const {
    gameFieldTop,
    averagePixelSize,
    fullHeight,
    fullWidth,
    gameFieldHeight
} = DimensionProvider();

const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);
const maxBottom = fullHeight - shipDimensions.height;
const maxRight = fullWidth - shipDimensions.width;

let moveLimit: MoveLimits = "none";

const shipSpawnLocation = {
    top: gameFieldHeight * 0.8,
    left: (fullWidth / 2) - shipDimensions.width,
};

let playerLocation: GameLocation = {...shipSpawnLocation};

/**
 * Gets the ship's spawn location, center screen.
 */
export function getShipSpawnLocation(): GameLocation {
    return {...shipSpawnLocation};
}

/**
 * Returns the player location as a new object.
 * @returns {GameLocation}. The current player location.
 */
export function getPlayerLocation(): GameLocation {
    // Spread to avoid changes to the playerLocation.
    return { ...playerLocation };
}

/**
 * Sets the player location in the game.
 * @param {GameLocation} location. Location where to the player ship should be.
 */
export function setPlayerLocation(location: GameLocation): void {
    // Spread to avoid reference issues.
    playerLocation = { ...location };
}

/**
 * Set a movement limit for the player.
 * @param {MoveLimits} limit. Set a movement impairment for player movement, or lift it by setting none.
 */
export function setMoveLimit(limit: MoveLimits): void {
    moveLimit = limit;
}

/**
 * Handles player movement.
 * @param {number} speed. Speed the ship can travel. Can vary depending on the level or if the player ship is forming.
 */
export function movePlayer(speed: number): void {
    const { keyboardState } = appState();

    const localKeyboardState ={ ... keyboardState};

    // Certain levels limit the movement of the player.
    // We'll use a fresh keyboardState object and make some adjustments.
    switch (moveLimit) {
        case "immobile":
            // Player cannot move
            return;
        case "sideways":
            // Used when the player forms. Override the keyboard state.
            localKeyboardState.down =   localKeyboardState.up = false;
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
        const newLocation = getLocation(playerLocation, angle, speed);
        if (fallsWithin(newLocation, gameFieldTop, maxBottom, 0, maxRight)) {
            playerLocation = newLocation;
        }
    }
}