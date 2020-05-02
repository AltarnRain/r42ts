/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLoop from "../GameLoop";
import { movePlayerHandler } from "../Handlers/MovePlayerHandler";
import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayer, setPlayerLocation, setPlayerMovementLimit } from "../State/Player/Actions";
import { appState, dispatch } from "../State/Store";
import { MoveLimits } from "../Types";
import { getFrameReturner } from "../Utility/Frame";
import { getLocation } from "../Utility/Location";
import PlayerFormationPart from "./PlayerFormationPart";
import { getPlayerFormationFrames } from "./PlayerFrames";
import PlayerShip from "./PlayerShip";

/**
 * Module:          PlayerSpawnManager
 * Responsibility:  Handles player respawning.
 */

const {
    pixelSize,
} = dimensionProvider();

const particleTravelDistance = pixelSize * 60;
const nozzleDistance = particleTravelDistance + pixelSize;
const nozzleOutAngle = 270;
const leftWingOutAngle = 200;
const rightWingOutAngle = 340;

const playerFormationFrames = getPlayerFormationFrames();

let nozzleTopPart: PlayerFormationPart;
let nozzleBottomPart: PlayerFormationPart;
let leftWingPart: PlayerFormationPart;
let rightWingPart: PlayerFormationPart;

let allMovingParts: PlayerFormationPart[] = [];

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
 * Creates the player formation particles.
 */
function createParticles(): void {

    const {
        playerState
    } = appState();

    const left = playerState.playerLeftLocation;
    const top = playerState.playerTopLocation;

    const nozzleTip = getLocation(left, top, nozzleOutAngle, nozzleDistance);
    const nozzleBottom = getLocation(left, top, nozzleOutAngle, particleTravelDistance);
    const leftWing = getLocation(left, top, leftWingOutAngle, particleTravelDistance);
    const rightWing = getLocation(left, top, rightWingOutAngle, particleTravelDistance);

    nozzleTopPart = new PlayerFormationPart(
        nozzleTip.left,
        nozzleTip.top,
        getFrameReturner(playerFormationFrames[0]),
        0,
        pixelSize * 2,
        0);

    nozzleBottomPart = new PlayerFormationPart(
        nozzleBottom.left,
        nozzleBottom.top,
        getFrameReturner(playerFormationFrames[1]),
        0,
        pixelSize * 2,
        pixelSize);

    leftWingPart = new PlayerFormationPart(
        leftWing.left,
        leftWing.top,
        getFrameReturner(playerFormationFrames[2]),
        0,
        0,
        pixelSize);

    rightWingPart = new PlayerFormationPart(
        rightWing.left,
        rightWing.top,
        getFrameReturner(playerFormationFrames[3]),
        0,
        pixelSize * 4,
        pixelSize);

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
    dispatch(setPlayerLocation(targetLeftLocation, targetTopLocation));
    createParticles();

    if (speed === "fast") {
        allMovingParts.forEach((p) => p.setSpeed(30));
    } else {
        allMovingParts.forEach((p) => p.setSpeed(10));
    }

    dispatch(setPlayerMovementLimit(limit));
    formationInProgress = true;
}

/**
 * Main function that draws the player formation.
 */
function updateState(): void {
    const { keyboardState } = appState();

    if (keyboardState.space === false && formationSpeed === "slow" && allMovingParts.some((p) => p.traveling())) {
        allMovingParts.forEach((p) => {
            p.updateState();
        });

        movePlayerHandler(5);
    } else if (formationSpeed === "fast") {
        allMovingParts.forEach((p) => {
            p.updateState();
        });
    }

    if (allMovingParts.every((p) => p.traveling() === false)) {
        // Only lift movement restrictions when the formation speed is slow.
        // Levels place a 'immobile' movement restriction
        // which is lifted when the level begins.
        // 'slow' means the level is running.
        if (formationSpeed === "slow") {
            dispatch(setPlayerMovementLimit ("none"));
        }
        dispatch(setPlayer(new PlayerShip()));
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
