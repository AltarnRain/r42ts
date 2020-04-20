/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../../Constants/CGAColors";
import GameLocation from "../../Models/GameLocation";
import DimensionProvider from "../../Providers/DimensionProvider";
import { getFrameDimensions } from "../../Utility/Frame";
import RobotFrames from "./RobotFrames";
import { getRandomArrayElement } from "../../Utility/Array";

/**
 * Module:          RobotSpawnLocations
 * Responsibility:  Returns the robot spawn locations.
 */

const {
    averagePixelSize,
    gameFieldTop
} = DimensionProvider();

const robotSpawnLocationsAndColor: Array<{ location: GameLocation, color: string }> = [];
const { width } = getFrameDimensions(RobotFrames.frames.F0, averagePixelSize);

const top = gameFieldTop + averagePixelSize * 20;
const left = averagePixelSize * 15;
const spacing = averagePixelSize * 3;

const colors = [
    CGAColors.lightBlue,
    CGAColors.lightCyan,
    CGAColors.lightRed,
    CGAColors.lightGreen,
    CGAColors.lightBlue,
    CGAColors.lightMagenta,
    CGAColors.lightCyan,
];

for (let i = 0; i < 14; i++) {
    const actualSpacing = i === 0 ? 0 : spacing * i;
    const actualLeft = left + i * width + spacing;

    const color = getRandomArrayElement(colors);

    const value = {
        location: {
            left: actualLeft + actualSpacing,
            top,
        },
        color,
    };

    robotSpawnLocationsAndColor.push(value);
}

export default robotSpawnLocationsAndColor;