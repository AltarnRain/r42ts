/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { calculateAngle as calculateAngle } from "../Utility/Geometry";
import { calculateDistance, getLocation } from "../Utility/Location";

/**
 * Module:          GetPhaserFrames
 * Responsibility:  Calculate the game locations to draw a phaser beam.
 */

export default function getPhaserLocations(source: GameLocation, target: GameLocation, pixelSize: number): GameLocation[] {

    // offset left by one game pixel to ensure the phaser appears at the nozzle of the ship.
    let offsetSourceLocation = { ...source, left: source.left };
    const angle = calculateAngle(offsetSourceLocation, target);
    let distance = calculateDistance(source, target);

    const returnValue: GameLocation[] = [];

    while (distance >= 0) {
        returnValue.push(getLocation(offsetSourceLocation, angle, pixelSize));
        distance -= pixelSize;
        offsetSourceLocation = getLocation(offsetSourceLocation, angle, pixelSize);
    }

    return returnValue;
}
