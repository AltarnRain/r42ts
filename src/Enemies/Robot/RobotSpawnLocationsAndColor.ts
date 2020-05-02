/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../../Constants/CGAColors";
import { GameLocation } from "../../Models/GameLocation";
import dimensionProvider from "../../Providers/DimensionProvider";
import { getRandomArrayElement } from "../../Utility/Array";
import { getFrameDimensions } from "../../Utility/Frame";
import getRobotFrames from "./RobotFrames";

/**
 * Module:          RobotSpawnLocations
 * Responsibility:  Returns the robot spawn locations.
 */

interface GameLocationAndcolor extends GameLocation {
    /**
     * color for the robot.
     */
    color: string;
}

const {
    pixelSize,
    gameFieldTop
} = dimensionProvider();

const robotSpawnLocationsAndColor: GameLocationAndcolor[] = [];
const { width } = getFrameDimensions(getRobotFrames().frames[0], pixelSize);

const top = gameFieldTop + pixelSize * 20;
const left = pixelSize * 15;
const spacing = pixelSize * 3;

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
        left: actualLeft + actualSpacing,
        top,
        color,
    };

    robotSpawnLocationsAndColor.push(value);
}

export default robotSpawnLocationsAndColor;