/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StateProviders
 * Responsibility:  Functions that provide a state object. Used in multiple places.
 */

import { produce } from "immer";
import Explosion from "../Models/Explosion";
import { Frame } from "../Types";
import { getFrameHitbox } from "../Utility/Frame";
import { fallsWithinGameField, getLocation } from "../Utility/Location";
import { ParticleState } from "./ParticleState";

export namespace StateProviders {
    /**
     * Gets a particle state object.
     * @export
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate
     * @param {number} speed. Speed of the particle in px/tick
     * @param {number} angle. Direction angle
     * @param {Frame} frame. Frame to render.
     * @param {number} [acceletation=1]. Below 1 slows down, above 1 speeds up. 1 by default
     * @param {number} [hitboxTopOffset=0]. Offset, in game pixels, that increases the top of the hitbox.
     * @param {number} [hitboxBottomOffset=0]. Offset, in game pixels, that increases the bottom of the hitbox.
     * @returns {ParticleState}
     */
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
            top,
        };

        return bullet;
    }

    /**
     * Gets a particle state object.
     * @export
     * @param {number} left. Left coordinate.
     * @param {number} top. Top coordinate
     * @param {number} speed. Speed of the particle in px/tick
     * @param {number} angle. Direction angle
     * @param {Frame} frame. Frame to render.
     * @param {number} order. The id of the owner. aka. The ship that fired the bullet.
     * @param {number} [hitboxTopOffset=0]. Offset, in game pixels, that increases the top of the hitbox.
     * @param {number} [hitboxBottomOffset=0]. Offset, in game pixels, that increases the bottom of the hitbox.
     * @returns {ParticleState}
     */
    export function getBulletParticleState(
        left: number,
        top: number,
        speed: number,
        angle: number,
        frame: Frame,
        ownerId: number,
        hitboxTopOffset: number = 0,
        hitboxBottomOffset: number = 0): ParticleState {

        const particle = getParticleState(left, top, speed, angle, frame, 1, hitboxTopOffset, hitboxBottomOffset);
        particle.owner = ownerId;

        return particle;
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

        const nextState: ParticleState[] = [];
        for (const particle of particles) {

            const updatedParticle = produce(particle, (draft) => {
                const newLocation = getLocation(particle.left, particle.top, particle.angle, particle.speed);
                const hitbox = getFrameHitbox(newLocation.left, newLocation.top, particle.coloredFrame);

                if (fallsWithinGameField(hitbox.left, hitbox.right, newLocation.top, hitbox.bottom)) {
                    draft.left = newLocation.left;
                    draft.top = newLocation.top;
                    draft.speed = particle.speed * particle.acceletation;
                    draft.hitbox = getFrameHitbox(newLocation.left, newLocation.top, particle.coloredFrame);
                }
            });

            if (particle !== updatedParticle) {
                nextState.push(updatedParticle);
            }
        }

        return nextState;
    }
}
