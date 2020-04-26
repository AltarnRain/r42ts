/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ParticleProvider
 * Responsibility:  Provide an array of particle objects for an Explosion
 */

import GameLocation from "../Models/GameLocation";
import Particle from "../Particles/Particle";
import { ExplosionProviderFunction } from "../Types/Types";
import { getFrameReturner } from "../Utility/Frame";

/**
 * particleProvider. Provides particle objects based on an Explosion asset.
 * @param {GameLocation} startLocation. Initial location of the particles.
 * @param {Explosion} explosion. Explosion asset used to generate particle objects.
 * @returns {Particle[]}. Resulting particles.
 */
export default function particleProvider(startLocation: GameLocation, explosion: ExplosionProviderFunction): Particle[] {

    const expClone = explosion();
    const locClone = {...startLocation };

    const particles: Particle[] = [];
    for (let i = 0; i < expClone.particleFrameIndexes.length; i++) {
        // Create an array with every particle frame.
        const particleFrameIndex = expClone.particleFrameIndexes[i];
        const particleFrame = expClone.particleFrames[particleFrameIndex];

        const angle = expClone.angles[i];
        const speed = expClone.useSpeed ? expClone.speed : expClone.speeds[i];

        const p = new Particle(locClone, getFrameReturner(particleFrame), angle, speed, expClone.acceleration);
        particles.push(p);
    }

    return particles;
}