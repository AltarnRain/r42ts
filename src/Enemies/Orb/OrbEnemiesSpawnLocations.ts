/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "../../Constants/Constants";
import GameLocation from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";

/**
 * Module:          OrbSpawnLocations
 * Responsibility:  Returns the orb spawn locations.
 */

const {
    pixelSize,
} = dimensionProvider();

const orbSpawnLocations: GameLocation[] = [];
const top = Locations.Orb.topStart;
let left = pixelSize * 16;
const spacing = pixelSize * 6;

for (let i = 0; i < 22; i++) {
    const value = {
        left,
        top,
    };

    left += spacing;

    orbSpawnLocations.push(value);
}

export default orbSpawnLocations;