/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../../Models/Explosion";
import { GameLocation } from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { Frame, MoveLimits } from "../../Types";
import { ParticleState } from "../ParticleState";

/**
 * Module:          PlayerState
 * Responsibility:  Holds all the state relevant to the player
 */

export default interface PlayerState {
    /**
     * A flag to track if the player is alive or not.
     * The player can me semi-alive when they are forming.
     * This flag can be used to trigger alive/dead behaviour for enemies, etc.
     */
    alive: boolean;

    /**
     * Movement limitations for the player
     */
    moveLimit: MoveLimits;

    /**
     * Left location of the player
     */
    left: number;

    /**
     * Top location of the player
     */
    top: number;

    /**
     * Hitbox of the player.
     */
    hitboxes: PlayerHitboxes | undefined;

    /**
     * Location of the player's nozzle. Used to determine when the player's bullet should appear.
     */
    nozzleLocation: GameLocation | undefined;

    /**
     * PlayerExplosion asset.
     */
    coloredExplosion: Explosion;

    /**
     * The frame of the player ship.
     */
    coloredFrame: Frame;

    /**
     * State of the player's bullet.
     */
    bulletState: ParticleState | undefined;
}

export interface PlayerHitboxes {
    middle: GameRectangle;
    bottom: GameRectangle;
}

export interface AlivePlayer extends PlayerState {
    /**
     * Hitbox of the player.
     */
    hitboxes: PlayerHitboxes;

    /**
     * Location of the player's nozzle. Used to determine when the player's bullet should appear.
     */
    nozzleLocation: GameLocation;
}