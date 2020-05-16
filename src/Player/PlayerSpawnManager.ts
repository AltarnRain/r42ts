/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Locations } from "../Constants/Constants";
import GameLoop from "../GameLoop";
import { playerMovementHandler } from "../Handlers/PlayerMovementHandler";
import dimensionProvider from "../Providers/DimensionProvider";
import { setPlayerIsAlive, setPlayerLocationData, setPlayerMovementLimit } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import { MoveLimits } from "../Types";
import { getLocation } from "../Utility/Location";
import PlayerFormationPart from "./PlayerFormationPart";
import { getPlayerFormationFrames } from "./PlayerFrames";

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

let currentMovementLimit: MoveLimits = "none";

/**
 * playerSpawnManager. Once register in the GameLoop this function will check
 * the state if the player can and show respawn.
 */
export default function playerSpawnManager(): void {
    const { playerState, enemyLevelState: { enemies, shrapnells, bullets } } = appState();

    if (!playerState.alive && formationInProgress === false && shrapnells.length === 0) {
        if (enemies.length > 0) { // Enemies in the level
            if (bullets.length === 0) { // wait till there's no particles.
                setup("slow", "sideways"); // Start the slow formation where the player has control.
            }
        } else {
            // No enemies, fast formation
            setup("fast", "immobile");
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

    const left = playerState.left;
    const top = playerState.top;

    const nozzleTip = getLocation(left, top, nozzleOutAngle, nozzleDistance);
    const nozzleBottom = getLocation(left, top, nozzleOutAngle, particleTravelDistance);
    const leftWing = getLocation(left, top, leftWingOutAngle, particleTravelDistance);
    const rightWing = getLocation(left, top, rightWingOutAngle, particleTravelDistance);

    nozzleTopPart = new PlayerFormationPart(
        nozzleTip.left,
        nozzleTip.top,
        playerFormationFrames[0],
        0,
        pixelSize * 2,
        0);

    nozzleBottomPart = new PlayerFormationPart(
        nozzleBottom.left,
        nozzleBottom.top,
        playerFormationFrames[1],
        0,
        pixelSize * 2,
        pixelSize);

    leftWingPart = new PlayerFormationPart(
        leftWing.left,
        leftWing.top,
        playerFormationFrames[2],
        0,
        0,
        pixelSize);

    rightWingPart = new PlayerFormationPart(
        rightWing.left,
        rightWing.top,
        playerFormationFrames[3],
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
function setup(speed: "fast" | "slow", limit: MoveLimits): void {
    formationSpeed = speed;

    // Store the current movement limit so we can restore it once the player has formed.
    currentMovementLimit = appState().playerState.moveLimit;

    dispatch(setPlayerLocationData(Locations.Player.spawnLocation.left, Locations.Player.spawnLocation.top));
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

        playerMovementHandler(5);
    } else if (formationSpeed === "fast") {
        allMovingParts.forEach((p) => {
            p.updateState();
        });
    }

    if (allMovingParts.every((p) => p.traveling() === false)) {
        dispatch(setPlayerIsAlive(true));
        dispatch(setPlayerMovementLimit(currentMovementLimit));
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
