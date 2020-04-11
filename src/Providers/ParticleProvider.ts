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
import { convertFrameColor } from "../Utility/Frame";
import { cloneObject } from "../Utility/Lib";

export default function particleProvider(location: GameLocation, explosion: Explosion) {

    const exp = cloneObject(explosion);
    const loc = cloneObject(location);

    const particles: Particle[] = [];
    for (let i = 0; i < exp.particleFrameIndexes.length; i++) {
        // Create an array with every particle frame.
        const particleFrameIndex = exp.particleFrameIndexes[i];
        const particleFrame = exp.particleFrames[particleFrameIndex];

        convertFrameColor(particleFrame);

        const angle = exp.angles[i];
        const speed = exp.useSpeed ? exp.speed : exp.speeds[i];

        const p = new Particle(particleFrame, angle, speed, exp.acceleration, loc);
        particles.push(p);
    }

    return particles;
}