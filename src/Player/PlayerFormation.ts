/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { setPlayerLocation } from "../Handlers/PlayerLocationHandler";
import GameLocation from "../Models/GameLocation";
import { PlayerLocationHandler } from "../Modules";
import DimensionProvider from "../Providers/DimensionProvider";
import { TickFunction } from "../Types/Types";
import { getNewLocation } from "../Utility/Location";
import PlayerFormationPart from "./PlayerFormationPart";
import { PlayerFormationFrames } from "./PlayerFrames";

/**
 * Module:          PlayerFormation
 * Responsibility:  Handles the player formation.
 */

const {
    averagePixelSize,
} = DimensionProvider();

const particleTravelDistance = averagePixelSize * 60;
const nozzleDistance = particleTravelDistance + averagePixelSize;
const nozzleOutAngle = 270;
const leftWingOutAngle = 200;
const rightWingOutAngle = 340;

let nozzleTipPart: PlayerFormationPart;
let nozzleBottomPart: PlayerFormationPart;
let leftWingPart: PlayerFormationPart;
let rightWingPart: PlayerFormationPart;

let allParts: PlayerFormationPart[] = [];

let nozzleTipStartLocation: GameLocation;
let nozzleBottomStartLocation: GameLocation;
let leftWingStartLocation: GameLocation;
let rightWingStartLocation: GameLocation;

let nozzleTipEndLocation: GameLocation;
let nozzleBottomEndLocation: GameLocation;
let leftWingEndLocation: GameLocation;
let rightWingEndLocation: GameLocation;

let done: () => void;

let updateStateLocal: TickFunction;

/**
 * Set the particle locations in the module
 * @param {GameLocation} targetLocation.
 */
function setPartLocations(targetLocation: GameLocation): void {

    const nozzleOrigin = { ...targetLocation, left: targetLocation.left + averagePixelSize * 2, top: targetLocation.top + averagePixelSize };

    nozzleTipStartLocation = getNewLocation(nozzleOrigin, nozzleOutAngle, nozzleDistance);
    nozzleBottomStartLocation = getNewLocation(nozzleOrigin, nozzleOutAngle, particleTravelDistance);

    const leftWingOrigin = { ...targetLocation, top: targetLocation.top + averagePixelSize };
    const rightWingOrigin = { left: targetLocation.left + averagePixelSize * 4, top: targetLocation.top };

    leftWingStartLocation = getNewLocation(leftWingOrigin, leftWingOutAngle, particleTravelDistance);
    rightWingStartLocation = getNewLocation(rightWingOrigin, rightWingOutAngle, particleTravelDistance);

    nozzleTipEndLocation = { ...targetLocation, left: targetLocation.left + averagePixelSize * 2, };
    nozzleBottomEndLocation = { ...targetLocation, left: targetLocation.left + averagePixelSize * 2 };
    leftWingEndLocation = { ...targetLocation, top: targetLocation.top + averagePixelSize * 1, left: targetLocation.left + averagePixelSize };
    rightWingEndLocation = { ...targetLocation, top: targetLocation.top + averagePixelSize * 1, left: targetLocation.left + averagePixelSize * 3 };
}

/**
 * Creates the player formation particles.
 */
function createParticles(): void {
    nozzleTipPart = new PlayerFormationPart(nozzleTipStartLocation, nozzleTipEndLocation, PlayerFormationFrames.F0, 0);
    nozzleBottomPart = new PlayerFormationPart(nozzleBottomStartLocation, nozzleBottomEndLocation, PlayerFormationFrames.F1, 0);
    leftWingPart = new PlayerFormationPart(leftWingStartLocation, leftWingEndLocation, PlayerFormationFrames.F2, 0);
    rightWingPart = new PlayerFormationPart(rightWingStartLocation, rightWingEndLocation, PlayerFormationFrames.F3, 0);

    allParts = [nozzleTipPart, nozzleBottomPart, leftWingPart, rightWingPart].filter((p) => p !== undefined);
}

/**
 * Forms the player quickly. Does not allow movement.
 * @param {() => void)} formationDoneCallback. Called when the formation animation has completed.
 */
export function formFast(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    setPlayerLocation(targetLocation);
    setPartLocations(targetLocation);
    createParticles();

    allParts.forEach((p) => p.setSpeed(20));

    PlayerLocationHandler.setMoveLimit("immobile");
    done = formationDoneCallback;
    updateStateLocal = updateStateFast;
}

export function formSlow(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    setPlayerLocation(targetLocation);
    setPartLocations(targetLocation);
    createParticles();

    allParts.forEach((p) => p.setSpeed(10));

    PlayerLocationHandler.setMoveLimit("sideways");
    done = formationDoneCallback;
    updateStateLocal = updateStateSlow;
}

export function draw(tick: number): void {
    if (updateStateLocal) {
        updateStateLocal(tick);
        allParts.forEach((p) => {
            p.updateState(tick);
            p.draw();
        });
    }
}

/**
 * Check if the player particles are done moving.
 * @param {number} tick. Current tick.
 */
function updateStateFast(tick: number): void {
    if (allParts.every((p) => p.traveling() === false)) {
        // Particles are done moving, lift player movement limit
        PlayerLocationHandler.setMoveLimit("none");
        if (done) {
            done();
        }
    }
}

function updateStateSlow(tick: number): void {
    // renderFrame(PlayerLocationHandler.getPlayerLocation(), PlayerFrame);

    if (allParts.every((p) => p.traveling() === false)) {
        // Particles are done moving, lift player movement limit
        PlayerLocationHandler.setMoveLimit("none");
        if (done) {
            done();
        }
    } else {
        PlayerLocationHandler.movePlayer(5);
        setPartLocations(PlayerLocationHandler.getPlayerLocation());

        nozzleTipPart?.setUpdatedTargetLocation(nozzleTipEndLocation);
        nozzleBottomPart?.setUpdatedTargetLocation(nozzleBottomEndLocation);
        leftWingPart?.setUpdatedTargetLocation(leftWingEndLocation);
        rightWingPart?.setUpdatedTargetLocation(rightWingEndLocation);
    }
}