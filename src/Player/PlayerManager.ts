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
};

const {
    gameFieldHeight,
    fullWidth,
    averagePixelSize
} = DimensionProvider();

const shipDimensions = getFrameDimensions(PlayerFrame, averagePixelSize);

const shipCenterSreenLocation = {
    top: gameFieldHeight * 0.8,
    left: (fullWidth / 2) - (shipDimensions.width / 2),
};

/**
 * Callback called by the runner when the player dies.
 */
export function onPlayerDeath(): void {
    window.setTimeout(handleRespawn);
}

export function begin(): void {
    state.playerFormationParticles = PlayerFormationParticleProvider(shipCenterSreenLocation);

    // Register the formation particles so they're rendered.
    state.playerFormationParticles.forEach((p) => Runner.register(p));

    window.setTimeout(handleFormation, 0);
}

/**
 * checkForPlayerParticles. This function tosses a check in a window.setTimeout that checks if the player's ship particles
 * have moved off screen.
 */
function handleRespawn(): void {
    if (Runner.playerParticlesOnScreen() === false) {
        state.playerFormationParticles = PlayerFormationParticleProvider(shipCenterSreenLocation);

        // Register the formation particles so they're rendered.
        state.playerFormationParticles.forEach((p) => Runner.register(p));

        // Start check if the formation parciles have reached their destination.
        window.setTimeout(handleFormation, 0);

    } else {
        // Particles still on the screen, queue a new call to check if this has changed.
        window.setTimeout(handleRespawn, 0);
    }
}

/**
 * Checks if the formation particle objects have reaced their destination.
 */
function handleFormation(): void {
    // Check if all the particles have reached their destination, that's when we register a new player object in the runner.
    if (state.playerFormationParticles.every((p) => p.traveling() === false)) {
        const player = new Player(shipCenterSreenLocation);
        console.log(shipCenterSreenLocation);
        Runner.register(player);
    } else {
        // Particles are still moving, queue a new check.
        window.setTimeout(handleFormation, 0);
    }
}