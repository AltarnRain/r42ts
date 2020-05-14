/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import CGAColors from "../../Constants/CGAColors";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import { ExplosionProviderFunction, OffsetFramesProviderFunction } from "../../Types";
import Mutators from "../../Utility/FrameMutators";

/**
 * Module:          DiaboloEnemey
 * Responsibility:  Handles the Diabolo enemny.
 */

export default class DiaboloEnemy extends BaseEnemy {

    constructor(
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

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, CGAColors.white);
        this.explosion.particleFrames.forEach((pf) => Mutators.Frame.setColor(pf, CGAColors.white));
    }

    /**
     * Update the Diabolo state.
     * @param tick
     */
    public updateState(tick: number): void {
        super.updateState(tick);
        this.dispatchCurrentState();
    }

    /**
     * Called when a frame change is required. The Diabolo frames are all colored at initialisation so we can keep this simple.
     */
    protected onFrameChange(): void {
        const nextFrame = this.frameProvider.getNextFrame();
        Mutators.Frame.convertHexToCGA(nextFrame);
        this.currentFrame = nextFrame;
    }

    /**
     * Returns the points of the Diabolo enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return 100;
    }
}
