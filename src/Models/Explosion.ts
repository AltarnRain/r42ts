/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame } from "../Types/Types";

/**
 * Module:          Explosion.
 * Responsibility:  Definition for an Explosion asset.
 */

export default interface Explosion {

    /**
     * Explosion center frame.
     */
    explosionCenterFrame: Frame;

    /**
     * Particle frames used by the explosion.
     */
    particleFrames: Frame[];

    /**
     * The indexes to use to draw each particle. The number of indexes determine the number of particles.
     */
    particleFrameIndexes: number[];

    /**
     * The angle for each particle. Must contain an angle for each particleFrameIndex.
     */
    angles: number[];

    /**
     * Explosion center delay
     */
    explosionCenterDelay: number;

    /**
     * Particle speeds. Used when each particle has its own speed.
     */
    speeds: number[];

    /**
     * Acceleration of a particle. Set to 1 to let it travel at a constant speed.
     */
    acceleration: number;

    /**
     * Wehn true use the particle speed. When false, the speeds array must contain a speed for each particle.
     */
    useSpeed: boolean;

    /**
     * Particle speed.
     */
    speed: number;
}
