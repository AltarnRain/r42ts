/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import DistanceParticle from "../Particles/DistanceParticle";
import DimensionProvider from "../Providers/DimensionProvider";
import { getNewLocation } from "../Utility/Location";
import { PlayerFormationFrames } from "./PlayerFrames";

/**
 * Module:          PlayerFormation
 * Responsibility:  Handles the player formation.
 */

const {
    averagePixelSize,
} = DimensionProvider();

const particleTravelDistance = averagePixelSize * 10;

export function PlayerFormationParticleProvider(targetLocation: GameLocation): DistanceParticle[] {

    // Calculate the starting postions of the player formation particles.
    const nozzleTipStartLocation = getNewLocation({
        left: targetLocation.left + averagePixelSize * 2,
        top: targetLocation.top,
    }, 270, particleTravelDistance);

    const nozzleBottomStartLocation = getNewLocation({
        left: targetLocation.left + averagePixelSize * 2,
        top: targetLocation.top + averagePixelSize,
    }, 270, particleTravelDistance);

    const leftWingStartLocation = getNewLocation({
        left: targetLocation.left,
        top: targetLocation.top + averagePixelSize,
    }, 225, particleTravelDistance);

    const rightWingStartLocation = getNewLocation({
        left: targetLocation.left + averagePixelSize * 2,
        top: targetLocation.top + averagePixelSize,
    }, 315, particleTravelDistance);

    const particles: DistanceParticle[] = [];
    particles.push(new DistanceParticle(PlayerFormationFrames.F0, 90, 17, 1, nozzleTipStartLocation, particleTravelDistance));
    particles.push(new DistanceParticle(PlayerFormationFrames.F1, 90, 20, 1, nozzleBottomStartLocation, particleTravelDistance));
    particles.push(new DistanceParticle(PlayerFormationFrames.F2, 45, 20, 1, leftWingStartLocation, particleTravelDistance));
    particles.push(new DistanceParticle(PlayerFormationFrames.F3, 135, 20, 1, rightWingStartLocation, particleTravelDistance));

    return particles;
}