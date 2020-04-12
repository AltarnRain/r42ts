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
    left: fullWidth / 2 - shipDimensions.width / 2,
};

function onPlayerDeath(): void {
    state.playerFormationParticles = PlayerFormationParticleProvider(shipCenterSreenLocation);
    state.playerFormationParticles.forEach((p) => Runner.register(p));
}