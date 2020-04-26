/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { movePlayer } from "../Handlers/MovePlayer";
import GameLoop from "../Main/GameLoop";
import dimensionProvider from "../Providers/DimensionProvider";
import { appState, dispatch } from "../State/Store";
import { MoveLimits } from "../Types/Types";
import { convertFramesColors, getFrameReturner } from "../Utility/Frame";
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

let nozzleTipLeftStartLocation: number;
let nozzleTipTopStartLocation: number;
let nozzleBottomLeftStartLocation: number;
let nozzleBottomTopStartLocation: number;
let leftWingLeftStartLocation: number;
let leftWingTopStartLocation: number;
let rightWingLeftStartLocation: number;
let rightWingTopStartLocation: number;

let nozzleTipLeftEndLocation: number;
let nozzleTipTopEndLocation: number;
let nozzleBottomLeftEndLocation: number;
let nozzleBottomTopEndLocation: number;
let leftWingLeftEndLocation: number;
let leftWingTopEndLocation: number;
let rightWingLeftEndLocation: number;
let rightWingTopEndLocation: number;

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
                setupFormation(playerState.playerLeftLocation, playerState.playerTopLocation, "slow", "sideways"); // Start the slow formation where the player has control.
            }
        } else {
            // No enemies, fast formation
            setupFormation(playerState.playerLeftLocation, playerState.playerTopLocation, "fast", "immobile");
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
function setPartLocations(left: number, top: number): void {

    const nozzleOrigin = { left: left + nozzleLeftOffset, top: top + averagePixelSize };
    const leftWingOrigin = { left, top: top + wingsTopOffset };
    const rightWingOrigin = { top: top + wingsTopOffset, left: left + rightWingLeftOffset };

    const nozzleTip = getLocation(nozzleOrigin.left, nozzleOrigin.top, nozzleOutAngle, nozzleDistance);
    const nozzleBottom = getLocation(nozzleOrigin.left, nozzleOrigin.top, nozzleOutAngle, particleTravelDistance);
    const leftWing = getLocation(leftWingOrigin.left, leftWingOrigin.top, leftWingOutAngle, particleTravelDistance);
    const rightWing = getLocation(rightWingOrigin.left, rightWingOrigin.top, rightWingOutAngle, particleTravelDistance);

    nozzleTipLeftStartLocation = nozzleTip.left;
    nozzleTipTopStartLocation = nozzleTip.top;

    nozzleBottomLeftStartLocation = nozzleBottom.left;
    nozzleBottomTopStartLocation = nozzleBottom.top;

    leftWingLeftStartLocation = leftWing.left;
    leftWingTopStartLocation = leftWing.top;

    rightWingLeftStartLocation = rightWing.left;
    rightWingTopStartLocation = rightWing.top;

    nozzleTipLeftEndLocation = nozzleTip.left + averagePixelSize * 2;
    nozzleTipTopEndLocation = nozzleTip.top;

    nozzleBottomLeftEndLocation = nozzleBottom.left + averagePixelSize;
    nozzleBottomTopEndLocation = nozzleBottom.top + averagePixelSize;

    leftWingLeftEndLocation = leftWing.left;
    leftWingTopEndLocation = leftWing.top + averagePixelSize * 1;

    rightWingLeftEndLocation = rightWing.left + averagePixelSize * 4;
    rightWingTopEndLocation = rightWing.top + averagePixelSize * 1;
}

/**
 * Creates the player formation particles.
 */
function createParticles(): void {
    nozzleTopPart = new PlayerFormationPart(nozzleTipLeftStartLocation, nozzleTipTopStartLocation, nozzleTipLeftEndLocation, nozzleTipTopEndLocation, getFrameReturner(playerFormationFrames[0]), 0);
    nozzleBottomPart = new PlayerFormationPart(nozzleBottomLeftStartLocation, nozzleBottomTopStartLocation, nozzleBottomLeftEndLocation, nozzleBottomTopEndLocation, getFrameReturner(playerFormationFrames[1]), 0);
    leftWingPart = new PlayerFormationPart(leftWingLeftStartLocation, leftWingTopStartLocation, leftWingLeftEndLocation, leftWingTopEndLocation, getFrameReturner(playerFormationFrames[2]), 0);
    rightWingPart = new PlayerFormationPart(rightWingLeftStartLocation, rightWingTopStartLocation, rightWingLeftEndLocation, rightWingTopEndLocation, getFrameReturner(playerFormationFrames[3]), 0);

    allMovingParts = [nozzleTopPart, nozzleBottomPart, leftWingPart, rightWingPart].filter((p) => p !== undefined);
}

/**
 * Forms the player quickly. Does not allow movement.
 * @param {() => void)} formationDoneCallback. Called when the formation animation has completed.
 * @param {"fast" | "slow"} speed. Speed of the player formation.
 * @param {MoveLimits} limit. Movement limit impaired on the player while the ship is forming.
 */
function setupFormation(targetLeftLocation: number, targetTopLocation: number, speed: "fast" | "slow", limit: MoveLimits): void {
    formationSpeed = speed;
    dispatch<number>("setPlayerLeftLocation", targetLeftLocation);
    dispatch<number>("setPlayerTopLocation", targetLeftLocation);
    setPartLocations(targetLeftLocation, targetTopLocation);
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
    const { playerState, keyboardState } = appState();

    if (keyboardState.space === false && formationSpeed === "slow" && allMovingParts.some((p) => p.traveling())) {
        allMovingParts.forEach((p) => {
            p.updateState();
        });

        movePlayer(5);
        setPartLocations(playerState.playerLeftLocation, playerState.playerTopLocation);

        nozzleTopPart?.setUpdatedTargetLocation(nozzleTipLeftEndLocation, nozzleTipTopEndLocation);
        nozzleBottomPart?.setUpdatedTargetLocation(nozzleBottomLeftEndLocation, nozzleBottomLeftEndLocation);
        leftWingPart?.setUpdatedTargetLocation(leftWingLeftEndLocation, leftWingTopEndLocation);
        rightWingPart?.setUpdatedTargetLocation(rightWingLeftEndLocation, rightWingTopEndLocation);
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
