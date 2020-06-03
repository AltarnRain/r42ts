/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { getRandomLocation } from "../Utility/Location";

/**
 * Module:          GetRandomSpawnLocations
 * Responsibility:  Returns Random spawn locations within the top and bottom limit.
 */

const {
    gameField,
    pixelSize
} = dimensionProvider();

export default function GetRandomSpawnLocations(spawnCount: number, maxTop: number, maxBottom: number): GameLocation[] {
    const locations: GameLocation[] = [];
    const outerLeft = gameField.left;
    const right = gameField.right - pixelSize * 3;

    for (let i = 0; i < spawnCount; i++) {
        const newLocation = getRandomLocation(right, outerLeft, maxBottom, maxTop);
        locations.push(newLocation);
    }

    return locations;
}