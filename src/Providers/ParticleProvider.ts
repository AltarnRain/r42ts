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
import { cloneObject, setFrameColors } from "../Utility/Lib";

export default function particleProvider(explosion: Explosion, location: GameLocation) {

    const exp = cloneObject(explosion);
    const loc = cloneObject(location);

    const particles: Particle[] = [];
    for (let i = 0; i < exp.particleFrames.length; i++) {
        // Create an array with every particle frame.
        const particleFrameIndex = exp.particleFrames[i];
        const particleFrame = exp.particles[particleFrameIndex];

        setFrameColors(particleFrame);

        const angle = exp.angles[i];
        const speed = exp.useSpeed ? exp.speed : exp.speeds[i];

        const p = new Particle(particleFrame, angle, speed, exp.acceleration, loc);
        particles.push(p);
    }

    return particles;
}