/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { setPlayerLocation } from "../Handlers/PlayerLocationHandler";
import GameLocation from "../Models/GameLocation";
import { PlayerLocationHandler } from "../Modules";
import DimensionProvider from "../Providers/DimensionProvider";
import renderFrame from "../Render/RenderFrame";
import { Frame, TickFunction } from "../Types/Types";
import { convertFramesColors } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";
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

let partsDoneTraveling: Array<{ frame: Frame; offset: GameLocation }> = [];

let nozzleTipStartLocation: GameLocation;
let nozzleBottomStartLocation: GameLocation;
let leftWingStartLocation: GameLocation;
let rightWingStartLocation: GameLocation;

let nozzleTipEndLocation: GameLocation;
let nozzleBottomEndLocation: GameLocation;
let leftWingEndLocation: GameLocation;
let rightWingEndLocation: GameLocation;

let done: () => void;

let formationSpeed: "slow" | "fast" = "slow";

/**
 * Set the particle locations in the module
 * @param {GameLocation} targetLocation.
 */
function setPartLocations(targetLocation: GameLocation): void {

    const nozzleOrigin = { left: targetLocation.left + nozzleLeftOffset, top: targetLocation.top + averagePixelSize };
    const leftWingOrigin = { ...targetLocation, top: targetLocation.top + wingsTopOffset };
    const rightWingOrigin = { top: targetLocation.top + wingsTopOffset, left: targetLocation.left + rightWingLeftOffset };

    nozzleTipStartLocation = getNewLocation(nozzleOrigin, nozzleOutAngle, nozzleDistance);
    nozzleBottomStartLocation = getNewLocation(nozzleOrigin, nozzleOutAngle, particleTravelDistance);

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
    setPlayerLocation(targetLocation);
    setPartLocations(targetLocation);
    createParticles();

    allMovingParts.forEach((p) => p.setSpeed(20));

    PlayerLocationHandler.setMoveLimit("immobile");
    done = formationDoneCallback;
}

/**
 * Handles a slow ship formation which allows the player alter their warp in location.
 * @param {GameLocation} targetLocation. Location where the ship formation should be headed to initially.
 * @param {() => void} formationDoneCallback. Called when the ship formation is complete.
 */
export function formSlow(targetLocation: GameLocation, formationDoneCallback: () => void): void {
    formationSpeed = "slow";
    setPlayerLocation(targetLocation);
    setPartLocations(targetLocation);
    createParticles();

    allMovingParts.forEach((p) => p.setSpeed(10));

    PlayerLocationHandler.setMoveLimit("sideways");
    done = formationDoneCallback;
}

/**
 * Main function that draws the player formation.
 */
export function updateState(): void {
    if (formationSpeed === "slow") {
        updateStateSlow();
    } else if (formationSpeed === "fast") {
        updateStateFast();
    }

    allMovingParts.forEach((p) => {
        p.updateState();
    });
}

/**
 * Draw the moving parts.
 */
export function draw(): void {
    allMovingParts.forEach((p) => p.draw());

    partsDoneTraveling.forEach((pdt) => {
        const currentPlayerLocation = PlayerLocationHandler.getPlayerLocation();

        // Calculate the ship part using the player location and the offsets.
        const location = {
            top: currentPlayerLocation.top + pdt.offset.top,
            left: currentPlayerLocation.left + pdt.offset.left,
        };

        renderFrame(location, pdt.frame);
    });
}

/**
 * Handles the fast formation of a player.
 * @param {number} tick. Current tick.
 */
function updateStateFast(): void {
    if (allMovingParts.every((p) => p.traveling() === false)) {
        PlayerLocationHandler.setMoveLimit("none");
        handleFormationComplete();
    }
}

/**
 * Handles the completion of the ship forming.
 */
function handleFormationComplete() {
    allMovingParts = [];
    partsDoneTraveling = [];
    if (done) {
        done();
    }
}

/**
 * Handles the slow formation of the player. The player can move sideways.
 */
function updateStateSlow(): void {
    allMovingParts = allMovingParts.filter((p) => {
        if (p.traveling()) {
            return true;
        } else {
            // When a ship part is done traveling, queue the render of a ship part that moves
            // with the same speed as the player's final location.
            // This gives the illusion that a part has arrived and the ship is forming piece by piece.
            switch (p) {
                case nozzleTopPart:
                    partsDoneTraveling.push({ frame: partFrames.F0, offset: { top: 0, left: nozzleLeftOffset } });
                    break;
                case nozzleBottomPart:
                    partsDoneTraveling.push({ frame: partFrames.F1, offset: { top: averagePixelSize, left: nozzleLeftOffset } });
                    break;
                case leftWingPart:
                    partsDoneTraveling.push({ frame: partFrames.F2, offset: { top: wingsTopOffset, left: 0 } });
                    break;
                case rightWingPart:
                    partsDoneTraveling.push({ frame: partFrames.F3, offset: { top: wingsTopOffset, left: rightWingLeftOffset } });
                    break;
            }

            return false;
        }
    });

    if (allMovingParts.every((p) => p.traveling() === false)) {
        PlayerLocationHandler.setMoveLimit("none");
        handleFormationComplete();
    } else {
        PlayerLocationHandler.movePlayer(5);
        setPartLocations(PlayerLocationHandler.getPlayerLocation());

        nozzleTopPart?.setUpdatedTargetLocation(nozzleTipEndLocation);
        nozzleBottomPart?.setUpdatedTargetLocation(nozzleBottomEndLocation);
        leftWingPart?.setUpdatedTargetLocation(leftWingEndLocation);
        rightWingPart?.setUpdatedTargetLocation(rightWingEndLocation);
    }
}