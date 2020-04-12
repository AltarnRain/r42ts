/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          PlayerManager
 * Responsibility:  Handles player stuff.
 */

import { Runner } from "../Modules";
import DimensionProvider from "../Providers/DimensionProvider";
import { getFrameDimensions } from "../Utility/Frame";
import Player from "./Player";
import { PlayerFormationParticleProvider } from "./PlayerFormation";
import { PlayerFrame } from "./PlayerFrames";
import PlayerManagerState from "./PlayerManagerState";

Runner.registerOnPlayerDeath(onPlayerDeath);

const state: PlayerManagerState = {
    player: undefined,
    playerFormationParticles: [],
    handleFormationHandler: 0,
    handlehandleRespawnHandle: 0,
};

const {
    gameFieldHeight,
    fullWidth,
    averagePixelSize
} = DimensionProvider();

const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);

const shipSpawnLocation = {
    top: gameFieldHeight * 0.8,
    left: (fullWidth / 2) - shipDimensions.width,
};

/**
 * Callback called by the runner when the player dies.
 */
export function onPlayerDeath(): void {
    state.handleFormationHandler = window.setTimeout(handleRespawn);
}

export function begin(): void {
    state.playerFormationParticles = PlayerFormationParticleProvider(shipSpawnLocation, 10000);

    // Register the formation particles so they're rendered.
    state.playerFormationParticles.forEach((p) => Runner.register(p));

    state.handleFormationHandler = window.setTimeout(handleFormation, 0);
}

/**
 * checkForPlayerParticles. This function tosses a check in a window.setTimeout that checks if the player's ship particles
 * have moved off screen.
 */
function handleRespawn(): void {

    // Only respawn the player if all the particles have gone off the screen.
    // TODO: Shoulw include bullets.
    if (Runner.getParticleCount() === 0) {
        state.playerFormationParticles = PlayerFormationParticleProvider(shipSpawnLocation, 0);
        state.playerFormationParticles.forEach((p) => Runner.register(p));

        killHandleFormationTimeout();

        // Start check if the formation parciles have reached their destination.
        state.handleFormationHandler = window.setTimeout(handleFormation, 0);
    } else {
        killHandleRespawnTimeout();
        state.handlehandleRespawnHandle = window.setTimeout(handleRespawn, 0);
    }
}

/**
 * Checks if the formation particle objects have reaced their destination.
 */
function handleFormation(): void {
    // Check if all the player formation particles have reached their destination, that's when we register a new player object in the runner.
    if (state.playerFormationParticles.every((p) => p.traveling() === false)) {
        state.player = new Player(shipSpawnLocation);
        Runner.register(state.player);

        // Reset array content to allow garbage collection to destroy the particle objects.
        state.playerFormationParticles = [];
    } else {
        killHandleFormationTimeout();
        // Particles are still moving, queue a new check.
        state.handleFormationHandler = window.setTimeout(handleFormation, 0);
    }
}

/**
 * Kill the handleFormation timer if it is set.
 */
function killHandleFormationTimeout(): void {
    if (state.handleFormationHandler !== undefined) {
        window.clearTimeout(state.handleFormationHandler);
    }
}

/**
 * Kill the handleFormation timer if it is set.
 */
function killHandleRespawnTimeout(): void {
    if (state.handlehandleRespawnHandle !== undefined) {
        window.clearTimeout(state.handlehandleRespawnHandle);
    }
}