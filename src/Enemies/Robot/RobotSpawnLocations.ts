/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "../../Constants/Constants";
import GameLocation from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";

/**
 * Module:          RobotSpawnLocations
 * Responsibility:  Returns the robot spawn locations.
 */

const {
    pixelSize,
} = dimensionProvider();

const robotSpawnLocations: GameLocation[] = [];

const top = Locations.robot.topStart;
let left = pixelSize * 12;
const spacing = pixelSize * 8;

for (let i = 0; i < 14; i++) {

    const value = {
        left,
        top,
    };

    left += spacing;

    robotSpawnLocations.push(value);
}

export default robotSpawnLocations;