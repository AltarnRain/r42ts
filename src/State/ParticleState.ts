/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ParticleState
 * Responsibility:  Definition for a single particle's state. Particles can be bullets, shrapnell, etc.
 *                  Essentially is a bunch of pixels that move and can hit something.
 */

import { GameRectangle } from "../Models/GameRectangle";
import { Frame } from "../Types/Frame";

export interface ParticleState {
    /**
     * Frame used to render the particle. Colored in for immedate rending.
     */
    coloredFrame: Frame;

    /**
     * Hitbox of the particle. Can be used to determine if the player hit something or something hit the player.
     */
    hitbox: GameRectangle;

    /**
     * Movement speed of the particle.
     */
    speed: number;

    /**
     * The angle the particle is traving in.
     */
    angle: number;

    /**
     * Factor used to accelerate the particle's speed.
     */
    acceletation: number;

    /**
     * Left position of the particle
     */
    left: number;

    /**
     * Top position of the particle.
     */
    top: number;

    /**
     * Owner of the particle. This is used to identify which bullet particles belong to which enemy. Used, for example, for enemies limited to one bullet
     * on screen per enemy.
     */
    owner?: number;
}
