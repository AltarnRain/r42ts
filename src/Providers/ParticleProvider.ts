/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ParticleProvider
 * Responsibility:  Provide an array of particle objects for an Explosion
 */

import { Explosion } from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { Particle } from "../Particles/Particle";
import { cloneObject, setFrameColors } from "../Utility/Lib";

export default function particleProvider(explosion: Explosion, location: GameLocation) {

    const exp = cloneObject(explosion);
    const loc = cloneObject(location);

    for (const particle of exp.particles) {
        setFrameColors(particle);
    }

    const particles: Particle[] = [];
    for (let i = 0; i < exp.particleFrames.length; i++) {
        // Create an array with every particle frame.
        const particleFrame = exp.particles[i];
        const angle = exp.angles[i];
        const speed = this.explosion.useSpeed ? this.explosion.speed : this.explosion.speeds[i];

        const p = new Particle(particleFrame, angle, speed, this.explosion.acceleration, loc);
        particles.push(p);
    }

    return particles;
}