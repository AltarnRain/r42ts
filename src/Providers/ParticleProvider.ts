/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ParticleProvider
 * Responsibility:  Provide an array of particle objects for an Explosion
 */

import Explosion from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import Particle from "../Particles/Particle";
import { cloneObject } from "../Utility/Lib";

/**
 * particleProvider. Provides particle objects based on an Explosion asset.
 * @param {GameLocation} startLocation. Initial location of the particles.
 * @param {Explosion} explosion. Explosion asset used to generate particle objects.
 * @returns {Particle[]}. Resulting particles.
 */
export default function particleProvider(startLocation: GameLocation, explosion: Explosion): Particle[] {

    const exp = cloneObject(explosion);
    const loc = cloneObject(startLocation);

    const particles: Particle[] = [];
    for (let i = 0; i < exp.particleFrameIndexes.length; i++) {
        // Create an array with every particle frame.
        const particleFrameIndex = exp.particleFrameIndexes[i];
        const particleFrame = exp.particleFrames[particleFrameIndex];

        const angle = exp.angles[i];
        const speed = exp.useSpeed ? exp.speed : exp.speeds[i];

        const p = new Particle(loc, particleFrame, angle, speed, exp.acceleration);
        particles.push(p);
    }

    return particles;
}