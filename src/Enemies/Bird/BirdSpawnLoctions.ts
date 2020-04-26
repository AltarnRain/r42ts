/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../../Providers/DimensionProvider";

/**
 * Module:          BirdSpawnLocations
 * Responsibility:  Define the spawn locations for the BirdEnemy.
 */

const firstAndThirdRowLeftStart = 20;
const secondRowLeftStart = 30;
const spacing = 20;
const birdSpawnLocations: Array<{ left: number, top: number}> = [];

const {
    averagePixelSize,
    gameFieldTop,
} = dimensionProvider();

// Top row birds.
for (let i = 0; i < 7; i++) {
    birdSpawnLocations.push({
        left: (firstAndThirdRowLeftStart * averagePixelSize) + spacing * i * averagePixelSize,
        top: gameFieldTop + averagePixelSize * 5,
    });
}

// Second row birds.
for (let i = 0; i < 6; i++) {
    birdSpawnLocations.push({
        left: (secondRowLeftStart * averagePixelSize) + spacing * i * averagePixelSize,
        top: gameFieldTop + averagePixelSize * 15,
    });
}

// Third row birds.
for (let i = 0; i < 7; i++) {
    birdSpawnLocations.push({
        left: (firstAndThirdRowLeftStart * averagePixelSize) + spacing * i * averagePixelSize,
        top: gameFieldTop + averagePixelSize * 25,
    });
}

export default birdSpawnLocations;