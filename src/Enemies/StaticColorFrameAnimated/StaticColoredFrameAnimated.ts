/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import { ExplosionProviderFunction, OffsetFramesProviderFunction } from "../../Types";
import Mutators from "../../Utility/FrameMutators";

/**
 * Module:          StaticColoredFrameAnimated
 * Responsibility:  Generic enemy class for enemies that have static colors and completely rely on a frame provider
 *                  for animation.
 */

export default class StaticColoredFrameAnimated extends BaseEnemy {
    /**
     * Enemy point worth.
     */
    private points: number;

    constructor(
        explosionColor: string | undefined,
        particleColor: string | undefined,
        points: number,
        frameChangeTime: number,
        getFrames: OffsetFramesProviderFunction,
        getExplosion: ExplosionProviderFunction,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider) {
        super(
            frameChangeTime,
            getFrames,
            getExplosion,
            locationProvider,
            frameProvider);

        this.points = points;

        // Explosions CAN be different in coloring. If a color is passed, we update the color, if not we'll convert from hex to CGA
        if (explosionColor) {
            Mutators.Frame.setColor(this.explosion.explosionCenterFrame, explosionColor);
        } else {
            Mutators.Frame.convertHexToCGA(this.explosion.explosionCenterFrame);
        }

        // Same for particles.
        if (particleColor) {
            this.explosion.particleFrames.forEach((pf) => Mutators.Frame.setColor(pf, particleColor));
        } else {
            this.explosion.particleFrames.forEach((pf) => Mutators.Frame.convertHexToCGA(pf));
        }
    }

    /**
     * Update the Piston state.
     * @param tick
     */
    public updateState(tick: number): void {
        super.updateState(tick);

        this.dispatchCurrentState();
    }

    /**
     * Called when a frame change is required. The Piston frames are all colored at initialisation so we can keep this simple.
     */
    protected onFrameChange(): void {
        const newFrame = this.frameProvider.getNextFrame();
        Mutators.Frame.convertHexToCGA(newFrame);
        this.currentFrame = newFrame;
    }

    /**
     * Returns the points of the Piston enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return this.points;
    }
}
