/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { movePlayer } from "../Handlers/MovePlayer";
import GameLoop from "../Main/GameLoop";
import GameLocation from "../Models/GameLocation";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState, dispatch } from "../State/Store";
import { MoveLimits } from "../Types/Types";
import { convertFramesColors } from "../Utility/Frame";
import { getLocation } from "../Utility/Location";
import PlayerFormationPart from "./PlayerFormationPart";
import { getPlayerFormationFrames } from "./PlayerFrames";
import PlayerShip from "./PlayerShip";

/**
 * Module:          PlayerSpawnManager
 * Responsibility:  Handles player respawning.
 */

const {
    averagePixelSize,
} = dimensionProvider();

const nozzleLeftOffset = averagePixelSize * 2;
const rightWingLeftOffset = averagePixelSize * 4;
const wingsTopOffset = averagePixelSize;

const particleTravelDistance = averagePixelSize * 60;
const nozzleDistance = particleTravelDistance + averagePixelSize;
const nozzleOutAngle = 270;
const leftWingOutAngle = 200;
const rightWingOutAngle = 340;

const playerFormationFrames = getPlayerFormationFrames();

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

let formationSpeed: "slow" | "fast";

let formationInProgress = false;

/**
 * playerSpawnManager. Once register in the GameLoop this function will check
 * the state if the player can and show respawn.
 */
export default function playerSpawnManager(): void {
    const { playerState, enemyLevelState: levelState } = appState();

    if (playerState.ship === undefined && formationInProgress === false) {
        if (levelState.enemies.length > 0) { // Enemies in the level
            if (levelState.particles.length === 0) { // wait till there's no particles.
                setupFormation(playerState.playerLocation, "slow", "sideways"); // Start the slow formation where the player has control.
            }
        } else {
            // No enemies, fast formation
            setupFormation(playerState.playerLocation, "fast", "immobile");
        }
    }

    if (formationInProgress) {
        updateState();
        GameLoop.registerDraw(draw);
    }
}

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
    nozzleTopPart = new PlayerFormationPart(nozzleTipStartLocation, nozzleTipEndLocation, () => playerFormationFrames[0], 0);
    nozzleBottomPart = new PlayerFormationPart(nozzleBottomStartLocation, nozzleBottomEndLocation, () => playerFormationFrames[1], 0);
    leftWingPart = new PlayerFormationPart(leftWingStartLocation, leftWingEndLocation, () => playerFormationFrames[2], 0);
    rightWingPart = new PlayerFormationPart(rightWingStartLocation, rightWingEndLocation, () => playerFormationFrames[3], 0);

    allMovingParts = [nozzleTopPart, nozzleBottomPart, leftWingPart, rightWingPart].filter((p) => p !== undefined);
}

/**
 * Forms the player quickly. Does not allow movement.
 * @param {() => void)} formationDoneCallback. Called when the formation animation has completed.
 * @param {"fast" | "slow"} speed. Speed of the player formation.
 * @param {MoveLimits} limit. Movement limit impaired on the player while the ship is forming.
 */
function setupFormation(targetLocation: GameLocation, speed: "fast" | "slow", limit: MoveLimits ): void {
    formationSpeed = speed;
    dispatch<GameLocation>("setPlayerLocation", targetLocation);
    setPartLocations(targetLocation);
    createParticles();

    if (speed === "fast") {
        allMovingParts.forEach((p) => p.setSpeed(17));
    } else {
        allMovingParts.forEach((p) => p.setSpeed(6));
    }

    dispatch<MoveLimits>("setPlayerMovementLimit", limit);
    formationInProgress = true;
}

/**
 * Main function that draws the player formation.
 */
function updateState(): void {
    const {playerState, keyboardState } = appState();

    if (keyboardState.space === false && formationSpeed === "slow" && allMovingParts.some((p) => p.traveling())) {
        allMovingParts.forEach((p) => {
            p.updateState();
        });

        movePlayer(5);
        setPartLocations(playerState.playerLocation);

        nozzleTopPart?.setUpdatedTargetLocation(nozzleTipEndLocation);
        nozzleBottomPart?.setUpdatedTargetLocation(nozzleBottomEndLocation);
        leftWingPart?.setUpdatedTargetLocation(leftWingEndLocation);
        rightWingPart?.setUpdatedTargetLocation(rightWingEndLocation);
    } else if (formationSpeed === "fast") {
        allMovingParts.forEach((p) => {
            p.updateState();
        });
    }

    if (allMovingParts.every((p) => p.traveling() === false)) {
        dispatch<MoveLimits>("setPlayerMovementLimit", "none");
        dispatch<PlayerShip>("setPlayer", new PlayerShip());
        allMovingParts = [];
        formationInProgress = false;
    }
}

/**
 * Draw the moving parts.
 */
function draw(): void {
    allMovingParts.forEach((p) => p.draw());
}
