/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "../../Constants/Constants";
import GameLocation from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";

/**
 * Module:          GetBoatSpawnLocations
 * Responsibility:  Returns the Piston spawn locations.
 */

const {
    gameField,
    pixelSize,
} = dimensionProvider();

export default function getBoatSpawnLocations(): GameLocation[] {
    const locations: GameLocation[] = [];
    let left = gameField.left + pixelSize * 5;
    const spacing = pixelSize * 10;

    for (let i = 0; i < 13; i++) {

        const value = {
            left,
            top: Locations.Boat.topStart,
        };

        left += spacing;

        locations.push(value);
    }

    return locations;
}