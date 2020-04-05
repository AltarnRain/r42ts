/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import renderFrame from "../Render/RenderFrame";
import { Frame } from "../Types/Types";
import { getNewLocation as getNextLocation } from "../Utility/Lib";
import { calculateDistance } from "../Utility/Location";

const phaserFrame: Frame = [
    ["E"]
];

/**
 * Module:          Phaser
 * Responsibility:  Draw the player's phaser beam.
 */

export function drawPhaser(source: GameLocation, target: GameLocation, speed: number): void {

    const dx = Math.abs(source.left - target.left);
    const dy = Math.abs(source.top - target.top);

    let currentLocation = { ...source };

    const t = dx / dy;
    const angle = Math.tan(t);

    let distance = calculateDistance(source, target);

    while (distance >= 0) {
        renderFrame(currentLocation, phaserFrame);
        distance -= speed;

        currentLocation = getNextLocation(angle, speed, currentLocation);
    }
}