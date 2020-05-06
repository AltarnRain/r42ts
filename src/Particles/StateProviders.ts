/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StateProviders
 * Responsibility:  Functions that provide a state object.
 */

import { produce } from "immer";
import Explosion from "../Models/Explosion";
import { ParticleState } from "../State/Player/ParticleState";
import { Frame } from "../Types";
import { getFrameHitbox } from "../Utility/Frame";
import { fallsWithinGameField, getLocation } from "../Utility/Location";

export namespace StateProviders {
    export function getParticleState(
        left: number,
        top: number,
        speed: number,
        angle: number,
        frame: Frame,
        acceletation: number = 1,
        hitboxTopOffset: number = 0,
        hitboxBottomOffset: number = 0): ParticleState {

        const bulletHitbox = getFrameHitbox(left, top, frame, hitboxTopOffset, hitboxBottomOffset);
        const bullet: ParticleState = {
            acceletation,
            angle,
            coloredFrame: frame,
            hitbox: bulletHitbox,
            speed,
            left,
            top
        };

        return bullet;
    }

    /**
     * particleProvider. Provides particle objects based on an Explosion asset.
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate.
     * @param {ExplosionProviderFunction} getExplosion. Explosion asset used to generate particle objects.
     * @returns {Particle[]}. Resulting particles.
     */
    export function explosionShrapnellProvider(left: number, top: number, explosion: Explosion): ParticleState[] {

        const particles: ParticleState[] = [];
        for (let i = 0; i < explosion.particleFrameIndexes.length; i++) {
            // Create an array with every particle frame.
            const particleFrameIndex = explosion.particleFrameIndexes[i];
            const particleFrame = explosion.particleFrames[particleFrameIndex];

            const angle = explosion.angles[i];
            const speed = explosion.useSpeed ? explosion.speed : explosion.speeds[i];

            const p = StateProviders.getParticleState(left, top, speed, angle, particleFrame, explosion.acceleration, 0, 0);
            particles.push(p);
        }

        return particles;
    }

    /**
     * Retrns a new particle state with updated speeds and locations.
     * @param {ParticleState[]} particles. Array of ParticleState
     * @returns {ParticleState[]}. Remaining particles with updated speeds and locations.
     */
    export function getUpdatedParticleState(particles: ParticleState[]): ParticleState[] {

        return produce(particles, (draft) => {
            draft.filter((particle) => {
                const newLocation = getLocation(particle.left, particle.top, particle.angle, particle.speed);

                if (fallsWithinGameField(particle.left, particle.top)) {
                    particle.left = newLocation.left;
                    particle.top = newLocation.top;
                    particle.speed = particle.speed * particle.acceletation;
                    return true;
                } else {
                    return false;
                }
            });
        });
    }
}
