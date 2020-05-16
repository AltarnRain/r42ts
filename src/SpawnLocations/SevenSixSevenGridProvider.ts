/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";

/**
 * Module:          Provides the locations for enemies that start in a grid of 7 / 6 / 7
 */

const {
    pixelSize,
    gameField,
} = dimensionProvider();

const topStart = pixelSize * 9;
const verticalSpacing = pixelSize * 8;

const firstAndThirdRowLeftStart = 30;
const secondRowLeftStart = 40;
const firstAndSecondRowSpacing = 16;
const secondRowSpacing = 16;

export default function sevenSixSevenGridProvider(): GameLocation[] {
    const returnValue: GameLocation[] = [];

    let top = topStart;

    // Top row.
    for (let i = 0; i < 7; i++) {
        returnValue.push({
            left: (firstAndThirdRowLeftStart * pixelSize) + firstAndSecondRowSpacing * i * pixelSize,
            top: gameField.top + top,
        });
    }

    top += verticalSpacing;

    // Second.
    for (let i = 0; i < 6; i++) {
        returnValue.push({
            left: (secondRowLeftStart * pixelSize) + secondRowSpacing * i * pixelSize,
            top: gameField.top + top,
        });
    }

    top += verticalSpacing;

    // Third row
    for (let i = 0; i < 7; i++) {
        returnValue.push({
            left: (firstAndThirdRowLeftStart * pixelSize) + firstAndSecondRowSpacing * i * pixelSize,
            top: gameField.top + top,
        });
    }

    return returnValue;
}