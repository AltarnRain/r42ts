/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          PistonSpawnLocations
 * Responsibility:  Returns the Piston spawn locations.
 */

const {
    gameField,
    pixelSize,
} = dimensionProvider();

export default function elevenInALine(top: number): GameLocation[] {
    const locations: GameLocation[] = [];
    let left = gameField.left + pixelSize * 18;
    const spacing = pixelSize * 12;

    for (let i = 0; i < 11; i++) {

        const value = {
            left,
            top,
        };

        left += spacing;

        locations.push(value);
    }

    return locations;
}