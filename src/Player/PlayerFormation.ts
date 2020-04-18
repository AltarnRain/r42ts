/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../Models/GameLocation";
import { PlayerLocationHandler } from "../Modules";
import DimensionProvider from "../Providers/DimensionProvider";
import { appState, dispatch } from "../State/Store";
import { MoveLimits } from "../Types/Types";
import { convertFramesColors } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
import { getLocation } from "../Utility/Location";
import PlayerFormationPart from "./PlayerFormationPart";
import { PlayerFormationFrames } from "./PlayerFrames";

/**
 * Module:          PlayerFormation
 * Responsibility:  Handles the player formation.
 */

const {
    averagePixelSize,
} = DimensionProvider();

const nozzleLeftOffset = averagePixelSize * 2;
const rightWingLeftOffset = averagePixelSize * 4;
const wingsTopOffset = averagePixelSize;

const particleTravelDistance = averagePixelSize * 60;
const nozzleDistance = particleTravelDistance + averagePixelSize;
const nozzleOutAngle = 270;
const leftWingOutAngle = 200;
const rightWingOutAngle = 340;

const partFrames = cloneObject(PlayerFormationFrames);
convertFramesColors(partFrames);

let nozzleTopPart: PlayerFormationPart;
let nozzleBottomPart: PlayerFormationPart;
let leftWingPart: PlayerFormationPart;
let rightWingPart: PlayerFormationPart;

let allMovingParts: PlayerFormationPart[] = [];

let nozzleTipStartLocation: GameLocation;
let nozzleBottomStartLocation: GameLocation;
let leftWingStartLocation: GameLocation;
let rightWingStartLocation: GameLocation;

let nozzleTipEndLocation: GameLocation;
let nozzleBottomEndLocation: GameLocation;
let leftWingEndLocation: GameLocation;
let rightWingEndLocation: GameLocation;

let formationSpeed: "slow" | "fast" = "slow";

let done: () => void;

/**
 * Set the particle locations in the module
 * @param {GameLocation} targetLocation.
 */
function setPartLocations(targetLocation: GameLocation): void {

    const nozzleOrigin = { left: targetLocation.left + nozzleLeftOffset, top: targetLocation.top + averagePixelSize };
    const leftWingOrigin = { ...targetLocation, top: targetLocation.top + wingsTopOffset };
    const rightWingOrigin = { top: targetLocation.top + wingsTopOffset, left: targetLocation.left + rightWingLeftOffset };

    nozzleTipStartLocation = getLocation(nozzleOrigin, nozzleOutAngle, nozzleDistance);
    nozzleBottomStartLocation = getLocation(nozzleOrigin, nozzleOutAngle, particleTravelDistance);

    leftWingStartLocation = getLocation(leftWingOrigin, leftWingOutAngle, particleTravelDistance);
    rightWingStartLocation = getLocation(rightWingOrigin, rightWingOutAngle, particleTravelDistance);

    nozzleTipEndLocation = { ...targetLocation, left: targetLocation.left + averagePixelSize * 2, };
    nozzleBottomEndLocation = { ...targetLocation, left: targetLocation.left + averagePixelSize * 2, top: targetLocation.top + averagePixelSize };

    leftWingEndLocation = { ...targetLocation, top: targetLocation.top + averagePixelSize * 1, left: targetLocation.left };
    rightWingEndLocation = { ...targetLocation, top: targetLocation.top + averagePixelSize * 1, left: targetLocation.left + averagePixelSize * 4};
}

/**
 * Creates the player formation particles.
 */
function createParticles(): void {
    nozzleTopPart = new PlayerFormationPart(nozzleTipStartLocation, nozzleTipEndLocation, PlayerFormationFrames.F0, 0);
    nozzleBottomPart = new PlayerFormationPart(nozzleBottomStartLocation, nozzleBottomEndLocation, PlayerFormationFrames.F1, 0);
    leftWingPart = new PlayerFormationPart(leftWingStartLocation, leftWingEndLocation, PlayerFormationFrames.F2, 0);
    rightWingPart = new PlayerFormationPart(rightWingStartLocation, rightWingEndLocation, PlayerFormationFrames.F3, 0);

    allMovingParts = [nozzleTopPart, nozzleBottomPart, leftWingPart, rightWingPart].filter((p) => p !== undefined);
}

/**
 * Forms the player quickly. Does not allow movement.
 * @param {() => void)} formationDoneCallback. Called when the formation animation has completed.
 */
export function formFast(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    formationSpeed = "fast";
    dispatch<GameLocation>("setPlayerLocation", targetLocation);

    setPartLocations(targetLocation);
    createParticles();

    allMovingParts.forEach((p) => p.setSpeed(20));

    dispatch<MoveLimits>("setPlayerMovementLimit", "immobile");
    done = formationDoneCallback;
}

/**
 * Handles a slow ship formation which allows the player alter their warp in location.
 * @param {GameLocation} targetLocation. Location where the ship formation should be headed to initially.
 * @param {() => void} formationDoneCallback. Called when the ship formation is complete.
 */
export function formSlow(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    formationSpeed = "slow";
    dispatch<GameLocation>("setPlayerLocation", targetLocation);
    setPartLocations(targetLocation);
    createParticles();

    allMovingParts.forEach((p) => p.setSpeed(10));

    dispatch<MoveLimits>("setPlayerMovementLimit", "sideways");
    done = formationDoneCallback;
}

/**
 * Main function that draws the player formation.
 */
export function updateState(): void {
    const {playerState } = appState();

    if (formationSpeed === "slow" && allMovingParts.some((p) => p.traveling())) {

        PlayerLocationHandler.movePlayer(5);
        setPartLocations(playerState.playerLocation);

        nozzleTopPart?.setUpdatedTargetLocation(nozzleTipEndLocation);
        nozzleBottomPart?.setUpdatedTargetLocation(nozzleBottomEndLocation);
        leftWingPart?.setUpdatedTargetLocation(leftWingEndLocation);
        rightWingPart?.setUpdatedTargetLocation(rightWingEndLocation);
    }

    allMovingParts.forEach((p) => {
        p.updateState();
    });

    if (allMovingParts.every((p) => p.traveling() === false)) {
        allMovingParts = [];
        dispatch<MoveLimits>("setPlayerMovementLimit", "none");
        done();
    }
}

/**
 * Draw the moving parts.
 */
export function draw(): void {
    allMovingParts.forEach((p) => p.draw());
}
