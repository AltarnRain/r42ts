/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../../Models/GameLocation";
import DimensionProvider from "../../Providers/DimensionProvider";

/**
 * Module:          BirdSpawnLocations
 * Responsibility:  Define the spawn locations for the bird enemy.
 */

const firstRowLeftStart = 20;
const spacing = 20;

const secondRowLeftStart = 30;

export const BirdSpawnLocations: GameLocation[] = [];

const {
    averagePixelSize,
    gameFieldTop,
} = DimensionProvider();

// Top row birds.
for (let i = 0; i < 7; i++) {
    BirdSpawnLocations.push({
        left: (firstRowLeftStart * averagePixelSize) + spacing * i * averagePixelSize,
        top: gameFieldTop + averagePixelSize * 5,
    });
}

// Second row birds.
for (let i = 0; i < 6; i++) {
    BirdSpawnLocations.push({
        left: (secondRowLeftStart * averagePixelSize) + spacing * i * averagePixelSize,
        top: gameFieldTop + averagePixelSize * 15,
    });
}

// Third row birds.
for (let i = 0; i < 7; i++) {
    BirdSpawnLocations.push({
        left: (firstRowLeftStart * averagePixelSize) + spacing * i * averagePixelSize,
        top: gameFieldTop + averagePixelSize * 25,
    });
}
