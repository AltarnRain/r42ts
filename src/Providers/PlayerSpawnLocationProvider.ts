/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { PlayerFrame } from "../Player/PlayerFrames";
import { getFrameDimensions } from "../Utility/Frame";
import DimensionProvider from "./DimensionProvider";

/**
 * Module:          PlayerSpawnLocationProvider
 * Responsibility:  Providers the location where the ship should spawn in a level with enemeies
 */

const {
    averagePixelSize,
    fullWidth,
    gameFieldHeight
} = DimensionProvider();

const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);

const shipSpawnLocation = {
    top: gameFieldHeight * 0.8,
    left: (fullWidth / 2) - shipDimensions.width,
};

/**
 * Gets the ship's spawn location, center screen.
 */
export default function getShipSpawnLocation(): GameLocation {
    return {...shipSpawnLocation};
}
