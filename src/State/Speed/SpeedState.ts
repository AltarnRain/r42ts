/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import baseBulletSpeeds from "./BaseBulletSpeeds";
import baseMovementSpeeds from "./BaseMovementSpeeds";

/**
 * Module:          SpeedState
 * Responsibility:  Houses all the speeds used in the game.
 */

export default interface SpeedState {

    /**
     * Movemnt speeds.
     */
    movement: typeof baseMovementSpeeds;

    /**
     * Bullet speeds.
     */
    bullets: typeof baseBulletSpeeds;

    /**
     * Minimum distance
     */
    minimumDistance: number;

    /**
     * The speed of the game.
     */
    gameSpeed: number;

    /**
     * The speed at which a player's ship is formed when the player can move.
     */
    slowParticleFormationSpeed: number;

    /**
     * The speed at which a player's ship is formed when the player cannot move.
     */
    fastParticleFormationSpeed: number;
}
