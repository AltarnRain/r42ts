/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../../Models/GameLocation";
import dimensionProvider from "../DimensionProvider";

/**
 * Module:          BirdSpawnLocations
 * Responsibility:  Define the spawn locations for the BirdEnemy.
 */

const firstAndThirdRowLeftStart = 20;
const secondRowLeftStart = 30;
const spacing = 20;
const birdSpawnLocations: GameLocation[] = [];

const {
    pixelSize,
    gameField,
} = dimensionProvider();

// Top row birds.
for (let i = 0; i < 7; i++) {
    birdSpawnLocations.push({
        left: (firstAndThirdRowLeftStart * pixelSize) + spacing * i * pixelSize,
        top: gameField.top + pixelSize * 5,
    });
}

// Second row birds.
for (let i = 0; i < 6; i++) {
    birdSpawnLocations.push({
        left: (secondRowLeftStart * pixelSize) + spacing * i * pixelSize,
        top: gameField.top + pixelSize * 15,
    });
}

// Third row birds.
for (let i = 0; i < 7; i++) {
    birdSpawnLocations.push({
        left: (firstAndThirdRowLeftStart * pixelSize) + spacing * i * pixelSize,
        top: gameField.top + pixelSize * 25,
    });
}

export default birdSpawnLocations;