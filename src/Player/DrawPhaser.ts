/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import GameLocation from "../Models/GameLocation";
import renderFrame from "../Render/RenderFrame";
import { Frame } from "../Types/Types";
import { calculateAngle as calculateAngle } from "../Utility/Geometry";
import { calculateDistance, getNewLocation } from "../Utility/Location";

const phaserFrame: Frame = [
    [CGAColors.yellow, CGAColors.yellow]
];

/**
 * Module:          Phaser
 * Responsibility:  Draw the player's phaser beam.
 */

export function drawPhasor(source: GameLocation, target: GameLocation, pixelSize: number): void {

    // offset left by one game pixel to ensure the phaser appears at the nozzle of the ship.
    let offsetSourceLocation = { ...source, left: source.left };
    const angle = calculateAngle(offsetSourceLocation, target);
    let distance = calculateDistance(source, target);

    while (distance >= 0) {
        renderFrame(offsetSourceLocation, phaserFrame);
        distance -= pixelSize;

        offsetSourceLocation = getNewLocation(offsetSourceLocation, angle, pixelSize);
    }
}
