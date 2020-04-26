/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { getPlayerFrame } from "../Player/PlayerFrames";
import { getFrameDimensions } from "../Utility/Frame";
import dimensionProvider from "./DimensionProvider";

/**
 * Module:          PlayerSpawnLocationProvider
 * Responsibility:  Providers the location where the ship should spawn in a level with enemeies
 */

const {
    averagePixelSize,
    fullWidth,
    gameFieldHeight
} = dimensionProvider();

const shipDimensions = getFrameDimensions(getPlayerFrame(), averagePixelSize);

const shipSpawnLocation = {
    top: gameFieldHeight * 0.99,
    left: (fullWidth / 2) - shipDimensions.width,
};

/**
 * Gets the ship's spawn location, center screen.
 */
export default function getShipSpawnLocation(): GameLocation {
    return {...shipSpawnLocation};
}
