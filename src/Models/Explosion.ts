/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Explosion.
 * Responsibility:  Definition for an Explosion asset.
 */

export interface Explosion {

    frame: string[][];

    /**
     * Explosion particles.
     */
    particles: string[][][];

    /**
     * Angles. The number of angles also determines the number of particles.
     */
    angles: number[];

    /**
     * Angle frames. The particle frame to combine with each angle.
     */
    particleFrames: number[];

    /**
     * Explosion center delay
     */
    explosionCenterDelay: number;

    speeds: number[];

    acceleration: number;

    useSpeed: boolean;

    speed: number;
}
