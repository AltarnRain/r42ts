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
 * Module:          PistonEnemey
 * Responsibility:  Handles the Piston enemeny first seen in level 2.
 */

export default class PistonEnemy extends BaseEnemy {
    constructor(
        frameChangeTime: number,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider,
        getExplosion: ExplosionProviderFunction,
        getFrames: OffsetFramesProviderFunction) {
        super(
            frameChangeTime,
            getFrames,
            getExplosion,
            locationProvider,
            frameProvider);

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame);
        Mutators.Frame.setColor(this.explosion.particleFrames[0]);
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
        // TODO
    }

    /**
     * Returns the points of the Piston enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return 100;
    }
}
