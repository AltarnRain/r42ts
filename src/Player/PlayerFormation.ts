/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { PlayerLocationHandler } from "../Modules";
import PlayerFormationParticle from "../Particles/PlayerFormationParticle";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { TickFunction } from "../Types/Types";
import { getNewLocation } from "../Utility/Location";
import { PlayerFormationFrames, PlayerFrame } from "./PlayerFrames";

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

let updateStateLocal: TickFunction;

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

/**
 * Calculate the endpoint for the formation particles.
 * @param {GameLocation} targetLocation. The location where the player will spawn.
 */
function getEndpoint(targetLocation: GameLocation) {
    return {
        left: targetLocation.left + averagePixelSize * 2,
        top: targetLocation.top
    };
}

/**
 * Creates the player formation particles.
 * @param {GameLocation} targetLocation. Location where the particles should go to.
 */
function createParticles(targetLocation: GameLocation, travelTime: number): void {
    particles = [];
    particles.push(new PlayerFormationParticle(nozzleTipStartLocation, targetLocation, PlayerFormationFrames.F0, travelTime));
    particles.push(new PlayerFormationParticle(nozzleBottomStartLocation, targetLocation, PlayerFormationFrames.F1, travelTime));
    particles.push(new PlayerFormationParticle(leftWingStartLocation, targetLocation, PlayerFormationFrames.F2, travelTime));
    particles.push(new PlayerFormationParticle(rightWingStartLocation, targetLocation, PlayerFormationFrames.F3, travelTime));
}

/**
 * Forms the player quickly. Does not allow movement.
 * @param {() => void)} formationDoneCallback. Called when the formation animation has completed.
 */
export function formFast(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    PlayerLocationHandler.setMoveLimit("immobile");
    const endpoint = getEndpoint(targetLocation);
    setParticleLocations(endpoint);
    createParticles(endpoint, 20);

    done = formationDoneCallback;
    updateStateLocal = updateStateFast;
}

export function formSlow(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    PlayerLocationHandler.setMoveLimit("sideways");
    const endpoint = getEndpoint(targetLocation);
    setParticleLocations(endpoint);
    createParticles(endpoint, 10);

    done = formationDoneCallback;
    updateStateLocal = updateStateSlow;
}

export function draw(tick: number): void {
    if (updateStateLocal) {
        updateStateLocal(tick);
    }

    particles?.forEach((p) => {
        p.updateState(tick);
        p.draw();
    });
}

/**
 * Check if the player particles are done moving.
 * @param {number} tick. Current tick.
 */
function updateStateFast(tick: number): void {
    if (particles?.every((p) => p.traveling() === false)) {
        // Particles are done moving, lift player movement limit
        PlayerLocationHandler.setMoveLimit("none");
        if (done) {
            done();
        }
    }
}

function updateStateSlow(tick: number): void {
    // renderFrame(PlayerLocationHandler.getPlayerLocation(), PlayerFrame);

    if (particles?.every((p) => p.traveling() === false)) {
        // Particles are done moving, lift player movement limit
        PlayerLocationHandler.setMoveLimit("none");
        if (done) {
            done();
        }
    } else {
        PlayerLocationHandler.movePlayer(5);

        particles.forEach((p) => {
            const endpoint = getEndpoint(PlayerLocationHandler.getPlayerLocation());
            p.setUpdatedTargetLocation(endpoint);
        });
    }
}