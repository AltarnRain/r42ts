/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../../Models/Explosion";
import { GameLocation } from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { MoveLimits, Frame } from "../../Types";
import { ParticleState } from "./ParticleState";

/**
 * Module:          PlayerState
 * Responsibility:  Holds all the state relevant to the player
 */

export default interface PlayerState {
    /**
     * Reference to the player object.
     */
    playerOnScreen: boolean;

    /**
     * Quick reference to the player bullet.
     */
    // playerBulletOnScreen: boolean;

    /**
     * Movement limitations for the player
     */
    moveLimit: MoveLimits;

    /**
     * Left location of the player
     */
    playerLeftLocation: number;

    /**
     * Top location of the player
     */
    playerTopLocation: number;

    playerHitbox: GameRectangle | undefined;

    playerNozzleLocation: GameLocation | undefined;

    playerExplosion: Explosion;

    playerFrame: Frame;

    playerBulletState: ParticleState | undefined;
}
