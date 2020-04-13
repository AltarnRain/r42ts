/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { PlayerLocationHandler, Runner } from "../Modules";
import PlayerFormationParticle from "../Particles/PlayerFormationParticle";
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

const particleTravelDistance = averagePixelSize * 60;
const nozzleOutAngle = 270;
const leftWingOutAngle = 210;
const rightWingOutAngle = 330;

let particles: PlayerFormationParticle[] = [];

let nozzleTipStartLocation: GameLocation;
let nozzleBottomStartLocation: GameLocation;
let leftWingStartLocation: GameLocation;
let rightWingStartLocation: GameLocation;

let done: () => void;

/**
 * Set the particle locations in the module
 * @param {GameLocation} targetLocation.
 */
function setParticleLocations(targetLocation: GameLocation): void {

    const nozzleDistance = particleTravelDistance + averagePixelSize * 6;

    nozzleTipStartLocation = getNewLocation({
        left: targetLocation.left,
        top: targetLocation.top,
    }, nozzleOutAngle, nozzleDistance);

    nozzleBottomStartLocation = getNewLocation({
        left: targetLocation.left,
        top: targetLocation.top
    }, nozzleOutAngle, particleTravelDistance);

    leftWingStartLocation = getNewLocation({
        left: targetLocation.left,
        top: targetLocation.top,
    }, leftWingOutAngle, particleTravelDistance);

    rightWingStartLocation = getNewLocation({
        left: targetLocation.left,
        top: targetLocation.top,
    }, rightWingOutAngle, particleTravelDistance);
}

function getEndpoint(targetLocation: GameLocation) {
    return {
        left: targetLocation.left + averagePixelSize * 2,
        top: targetLocation.top
    };
}

function createParticles(targetLocation: GameLocation): void {
    particles = [];
    particles.push(new PlayerFormationParticle(nozzleTipStartLocation, targetLocation, PlayerFormationFrames.F0, 2));
    particles.push(new PlayerFormationParticle(nozzleBottomStartLocation, targetLocation, PlayerFormationFrames.F1, 2));
    particles.push(new PlayerFormationParticle(leftWingStartLocation, targetLocation, PlayerFormationFrames.F2, 2));
    particles.push(new PlayerFormationParticle(rightWingStartLocation, targetLocation, PlayerFormationFrames.F3, 2));
}

/**
 * Forms the player quickly. Does not allow movement.
 * @param {() => void)} formationDoneCallback. Called when the formation animation has completed.
 */
export function formFast(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    PlayerLocationHandler.setMoveLimit("immobile");
    const endpoint = getEndpoint(targetLocation);
    setParticleLocations(endpoint);
    createParticles(endpoint);
    particles.forEach((p) => {
        p.setSpeed(20);
        Runner.register(p);
    });

    done = formationDoneCallback;
}

/**
 * Check if the player particles are done moving.
 * @param {number} tick. Current tick.
 */
export function updateState(tick: number): void {
    if (particles?.every((p) => p.traveling() === false)) {
        // Particles are done moving, lift player movement limit
        PlayerLocationHandler.setMoveLimit("none");
        if (done) {
            done();
        }
    }
}
