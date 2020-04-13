/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { PlayerFrame } from "../Player/PlayerFrames";
import DimensionProvider from "../Providers/DimensionProvider";
import { getFrameDimensions } from "../Utility/Frame";
import { getAngle } from "../Utility/Geometry";
import { fallsWithin, getNewLocation } from "../Utility/Location";
import KeyboardState from "./KeyboardStateHandler/KeyboardStateHandler";

/**
 * Module:          PlayerLocationHandler
 * Responsibility:  Handles changes to the player location due to movement. Also provides a single source of truth for any class or module
 *                  That uses the player location or needs to change it.
 */

let playerLocation: GameLocation;

const {
    gameFieldTop,
    averagePixelSize,
    fullHeight,
    fullWidth,
} = DimensionProvider();

const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);
const maxBottom = fullHeight - shipDimensions.height;
const maxRight = fullWidth - shipDimensions.width;

export function getPlayerLocation(): GameLocation {
    return playerLocation;
}

export function setPlayerLocation(location: GameLocation): void {
    playerLocation = { ...location };
}

export function movePlayer(): void {
    const angle = getAngle(KeyboardState);

    if (angle !== -1) {
        const newLocation = getNewLocation(playerLocation, angle, 15);
        if (fallsWithin(newLocation, gameFieldTop, maxBottom, 0, maxRight)) {
            playerLocation = newLocation;
        }
    }
}