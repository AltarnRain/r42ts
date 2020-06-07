/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
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
}
