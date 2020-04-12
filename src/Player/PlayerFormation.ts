/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import DistanceParticle from "../Particles/DistanceParticle";
import DimensionProvider from "../Providers/DimensionProvider";
import { reverseDegreeAngle } from "../Utility/Geometry";
import { getNewLocation } from "../Utility/Location";
import { PlayerFormationFrames } from "./PlayerFrames";

/**
 * Module:          PlayerFormation
 * Responsibility:  Handles the player formation.
 */

const {
    averagePixelSize,
} = DimensionProvider();

const particleTravelDistance = averagePixelSize * 60;
const leftOffset = averagePixelSize * 2;

const nozzleOutAngle = 270;
const leftWingOutAngle = 210;
const rightWingOutAngle = 330;

const nozzleInAngle = reverseDegreeAngle(nozzleOutAngle);
const leftWindInAngle = reverseDegreeAngle(leftWingOutAngle);
const rightWingInAngle = reverseDegreeAngle(rightWingOutAngle);

export function PlayerFormationParticleProvider(targetLocation: GameLocation, speedIncrease: number): DistanceParticle[] {

    // Calculate the starting postions of the player formation particles.
    const nozzleDistance = particleTravelDistance + averagePixelSize * 6;
    const nozzleTipStartLocation = getNewLocation({
        left: targetLocation.left + leftOffset,
        top: targetLocation.top + averagePixelSize - 6,
    }, nozzleOutAngle, nozzleDistance);

    const nozzleBottomStartLocation = getNewLocation({
        left: targetLocation.left + leftOffset,
        top: targetLocation.top + averagePixelSize
    }, nozzleOutAngle, particleTravelDistance);

    const leftWingStartLocation = getNewLocation({
        left: targetLocation.left + leftOffset + averagePixelSize * -2,
        top: targetLocation.top + averagePixelSize,
    }, leftWingOutAngle, particleTravelDistance);

    const rightWingStartLocation = getNewLocation({
        left: targetLocation.left + leftOffset + averagePixelSize * 2,
        top: targetLocation.top + averagePixelSize,
    }, rightWingOutAngle, particleTravelDistance);

    const x = 4000;
    const particleSpeed = (x + speedIncrease) / particleTravelDistance;
    const nozzleTipSpeed = particleSpeed * (nozzleDistance / particleTravelDistance);

    const particles: DistanceParticle[] = [];
    particles.push(new DistanceParticle(PlayerFormationFrames.F0, nozzleInAngle, nozzleTipSpeed, 1, nozzleTipStartLocation, nozzleDistance));
    particles.push(new DistanceParticle(PlayerFormationFrames.F1, nozzleInAngle, particleSpeed, 1, nozzleBottomStartLocation, particleTravelDistance));
    particles.push(new DistanceParticle(PlayerFormationFrames.F2, leftWindInAngle, particleSpeed, 1, leftWingStartLocation, particleTravelDistance));
    particles.push(new DistanceParticle(PlayerFormationFrames.F3, rightWingInAngle, particleSpeed, 1, rightWingStartLocation, particleTravelDistance));

    return particles;
}