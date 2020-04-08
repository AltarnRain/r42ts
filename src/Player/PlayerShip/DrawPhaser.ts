/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../../Constants/CGAColors";
import GameLocation from "../../Models/GameLocation";
import renderFrame from "../../Render/RenderFrame";
import { Frame } from "../../Types/Types";
import { calculateDistance, getNewLocation } from "../../Utility/Location";

const phaserFrame: Frame = [
    [CGAColors.yellow, CGAColors.yellow]
];

/**
 * Module:          Phaser
 * Responsibility:  Draw the player's phaser beam.
 */

export function drawPhasor(source: GameLocation, target: GameLocation, pixelSize: number): void {

    const dx = Math.abs(source.left - target.left + pixelSize);
    const dy = Math.abs(source.top - target.top);

    let currentLocation = { ...source };

    // Get the angle in degrees.
    let angle = Math.atan2(dy, dx) * 180 / Math.PI * -1;

    // bottom left is handler right by default. No if needed.

    // source is to the bottom right of the object.
    if (source.left > target.left && source.top > target.top) {
        angle = 180 - angle;
    } else if (source.left < target.left && source.top < target.top) {
        // source is to the top left of the object.
        angle = angle * -1;
    } else if (source.left > target.left && source.top < target.top) {
        // source is to the top right of the object.
        angle = angle - 180 * -1;
    }

    let distance = calculateDistance(source, target);

    while (distance >= 0) {
        renderFrame(currentLocation, phaserFrame);
        distance -= pixelSize;

        currentLocation = getNewLocation(currentLocation, angle, pixelSize);
    }
}