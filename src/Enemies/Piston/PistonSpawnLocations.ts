/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "../../Constants/Constants";
import { GameLocation } from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";
import { getFrameDimensions } from "../../Utility/Frame";
import getPistonOffsetFrames from "./GetPistonOffsetFrames";

/**
 * Module:          RobotSpawnLocations
 * Responsibility:  Returns the robot spawn locations.
 */

const {
    gameField,
    pixelSize,
} = dimensionProvider();

const pistonSpawnLocations: GameLocation[] = [];
const top = Locations.Enemies.Piston.topStart;
let left = gameField.left + pixelSize * 18;
const spacing = pixelSize * 12;

for (let i = 0; i < 11; i++) {

    const value = {
        left,
        top,
    };

    left += spacing;

    pistonSpawnLocations.push(value);
}

export default pistonSpawnLocations;