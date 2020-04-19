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

for (let i = 0; i < 14; i++) {
    const actualSpacing = i === 0 ? 0 : spacing * i;
    const actualLeft = left + i * width + spacing;

    let color = "";

    switch (i) {
        case 0:
            color = CGAColors.lightBlue;
            break;
        case 1:
            color = CGAColors.lightCyan;
            break;
        case 2:
            color = CGAColors.lightRed;
            break;
        case 3:
            color = CGAColors.lightGreen;
            break;
        case 4:
            color = CGAColors.lightMagenta;
            break;
        case 6:
            color = CGAColors.lightBlue;
            break;
        case 7:
            color = CGAColors.lightMagenta;
            break;
        case 8:
            color = CGAColors.lightRed;
            break;
        case 9:
            color = CGAColors.lightBlue;
            break;
        case 10:
            color = CGAColors.lightMagenta;
            break;
        case 11:
            color = CGAColors.lightCyan;
            break;
        case 12:
        case 13:
            color = CGAColors.lightGreen;
            break;
    }

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