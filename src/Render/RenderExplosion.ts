/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Renders an explosion.
 * Responsibility:  Render an explosion on the screen.
 */

import IDraw from "../Interfaces/IDraw";
import { Explosion } from "../Models/Explosion";
import GameLocation from "../Models/GameLocation";
import { cloneObject, getFrameCenter, getNewLocation, setFrameColors } from "../Utility/Lib";
import renderFrame from "./RenderFrame";

export default class RenderExplosion implements IDraw {

    private startTick?: number;
    private explosion: Explosion;
    private location: GameLocation;

    private particles: Array<{ frame: string[][]; location: GameLocation, speed: number }> = [];
    /**
     *
     */
    constructor(explosion: Explosion, location: GameLocation) {
        this.explosion = cloneObject(explosion);
        this.location = location;

        setFrameColors(this.explosion.frame);

        for (const particle of this.explosion.particles) {
            setFrameColors(particle);
        }

        let index = 0;
        for (const particleFrames of this.explosion.particleFrames) {
            // Create an array with every particle frame.
            const particleFrame = this.explosion.particles[particleFrames];

            this.particles.push({
                frame: particleFrame,
                location: {
                    ...getFrameCenter(location, particleFrame)
                },
                speed: this.explosion.useSpeed ? this.explosion.speed : this.explosion.speeds[index],
            });

            index++;
        }
    }

    public draw(tick: number): void {

        if (!this.startTick) {
            this.startTick = tick;
        }

        // Render the center for 200 ticks.
        if (tick < this.startTick + this.explosion.explosionCenterDelay) {
            renderFrame(this.location, this.explosion.frame);
        } else {
            // Render the particles.
            for (let index = 0; index < this.particles.length; index++) {
                const particle = this.particles[index];
                const particleFrame = particle.frame;
                const particleLocation = particle.location;

                renderFrame(particleLocation, particleFrame);

                const particleAngle = this.explosion.angles[index];

                const location = getNewLocation(particleAngle, particle.speed, particle.location.left, particle.location.top);
                const newSpeed = particle.speed *= this.explosion.acceleration;
                this.particles[index] = { ...particle, location, speed: newSpeed };
            }
        }
    }
}