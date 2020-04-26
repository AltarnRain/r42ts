/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RobotSpawnLocations
 * Responsibility:  Returns the robot spawn locations.
 */

import dimensionProvider from "../../Providers/DimensionProvider";
import { getFrameDimensions } from "../../Utility/Frame";
import getOrbFrames from "./OrbFrames";

const {
    averagePixelSize,
    gameFieldTop
} = dimensionProvider();

const orbSpawnLocations: Array<{ left: number, top: number }> = [];
const { width } = getFrameDimensions(getOrbFrames().frames[0], averagePixelSize);

const top = gameFieldTop + averagePixelSize * 26;
const left = averagePixelSize * 10;
const spacing = averagePixelSize * 2;

for (let i = 0; i < 22; i++) {
    const actualSpacing = i === 0 ? 0 : spacing * i;
    const actualLeft = left + i * width + spacing;

    const value = {
        left: actualLeft + actualSpacing,
        top,
    };

    orbSpawnLocations.push(value);
}

export default orbSpawnLocations;