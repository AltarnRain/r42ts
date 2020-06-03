/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import CGAColors from "../../Constants/CGAColors";
import { Points } from "../../Constants/Constants";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import ExplosionProviderFunction from "../../ShipsToFireProviders/ExplosionProviderFunction";
import OffsetFramesProviderFunction from "../../Types/OffsetFramesProviderFunction";
import Mutators from "../../Utility/FrameMutators";

/**
 * Module:          AsteroidEnemy
 * Responsibility:  An asteroid. A piece of rock really.
 */

export class AsteroidEnemy extends BaseEnemy {

    /**
     * The astroid is the only enem that uses hitpoints. It starts with 4.
     */
    private hitpoints = 4;

    constructor(
        frameChangeTime: number,
        getOffsetFrames: OffsetFramesProviderFunction,
        getExplosion: ExplosionProviderFunction,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider) {
        super(frameChangeTime,
            getOffsetFrames,
            getExplosion,
            locationProvider,
            frameProvider);

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, CGAColors.lightRed);
        this.explosion.particleFrames.forEach((pf) => Mutators.Frame.setColor(pf, CGAColors.lightRed));
    }

    /**
     * Returns points for this enemy.
     * @returns {number}. Points.
     */
    public getPoints(): number {
        return Points.asteroid;
    }

    /**
     * Returns the remaining hitpoints of the asteroid.
     * @returns {number}. Remaining hitpoints.
     */

    public getHitpoints(): number {
        return this.hitpoints;
    }

    /**
     * Reduces the remaining hitpoints by 1. Also sets the next frame to
     * make it appear as if the asteroid is getting damager.
     */
    public recudeHitpoints(): void {
        this.hitpoints--;
        // A reduction in hitpoints shows the next frame. This makes it
        // appear as if the asteroid is getting damaged.
        this.frameProvider.getNextFrame();
    }

    /**
     * Frame change handler.
     */
    protected onFrameChange(): void {

        // The asteroid is an odd duck here. It doesn't change frames to be animated
        // but to show damage to it.
        // So, we return the current frame and change the frame when the astroid is hit.
        const newFrame = this.frameProvider.getCurrentFrame();
        Mutators.Frame.convertHexToCGA(newFrame);
        this.currentFrame = newFrame;
    }

    /**
     * Not implemented.
     */
    public alterState(): void {
        // Not needed
    }
}