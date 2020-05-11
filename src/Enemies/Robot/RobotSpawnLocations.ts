/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "../../Constants/Constants";
import { GameLocation } from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";
import { getFrameDimensions } from "../../Utility/Frame";
import getRobotFrames from "./RobotFrames";

/**
 * Module:          RobotSpawnLocations
 * Responsibility:  Returns the robot spawn locations.
 */

const {
    pixelSize,
} = dimensionProvider();

const robotSpawnLocations: GameLocation[] = [];
const { width } = getFrameDimensions(getRobotFrames().frames[0], pixelSize);

const top = Locations.Enemies.robot.topStart;
const left = pixelSize * 15;
const spacing = pixelSize * 3;

for (let i = 0; i < 14; i++) {
    const actualSpacing = i === 0 ? 0 : spacing * i;
    const actualLeft = left + i * width + spacing;

    const value = {
        left: actualLeft + actualSpacing,
        top,
    };

    robotSpawnLocations.push(value);
}

export default robotSpawnLocations;