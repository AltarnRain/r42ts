/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RobotSpawnLocations
 * Responsibility:  Returns the robot spawn locations.
 */

import GameLocation from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";
import { getFrameDimensions } from "../../Utility/Frame";
import orbFrames from "./OrbFrames";

const {
    averagePixelSize,
    gameFieldTop
} = dimensionProvider();

const orbSpawnLocations: GameLocation[] = [];
const { width } = getFrameDimensions(orbFrames.frames[0], averagePixelSize);

const top = gameFieldTop + averagePixelSize * 40;
const left = averagePixelSize * 15;
const spacing = averagePixelSize;

for (let i = 0; i < 20; i++) {
    const actualSpacing = i === 0 ? 0 : spacing * i;
    const actualLeft = left + i * width + spacing;

    const value = {
        left: actualLeft + actualSpacing,
        top,
    };

    orbSpawnLocations.push(value);
}

export default orbSpawnLocations;