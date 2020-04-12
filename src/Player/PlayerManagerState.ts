/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import DistanceParticle from "../Particles/DistanceParticle";
import Player from "./Player";

/**
 * Module:          PlayerManagerState
 * Responsibility:  Defines the state of the PlayerManager
 */

export default interface PlayerManagerState {
    /**
     * Reference to the current player object.
     */
    player: Player | undefined;

    playerFormationParticles: DistanceParticle[];
}