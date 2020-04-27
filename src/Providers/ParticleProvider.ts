/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ParticleProvider
 * Responsibility:  Provide an array of particle objects for an Explosion
 */

import Particle from "../Particles/Particle";
import { ExplosionProviderFunction } from "../Types/Types";
import { getFrameReturner } from "../Utility/Frame";

/**
 * particleProvider. Provides particle objects based on an Explosion asset.
 * @param {number} left. Left coordinate.
 * @param {number} top. Top coordinate.
 * @param {ExplosionProviderFunction} getExplosion. Explosion asset used to generate particle objects.
 * @returns {Particle[]}. Resulting particles.
 */
export default function particleProvider(left: number, top: number, getExplosion: ExplosionProviderFunction): Particle[] {

    const explosion = getExplosion();

    const particles: Particle[] = [];
    for (let i = 0; i < explosion.particleFrameIndexes.length; i++) {
        // Create an array with every particle frame.
        const particleFrameIndex = explosion.particleFrameIndexes[i];
        const particleFrame = explosion.particleFrames[particleFrameIndex];

        const angle = explosion.angles[i];
        const speed = explosion.useSpeed ? explosion.speed : explosion.speeds[i];

        const p = new Particle(left, top, getFrameReturner(particleFrame), angle, speed, explosion.acceleration);
        particles.push(p);
    }

    return particles;
}