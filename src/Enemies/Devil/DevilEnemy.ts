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
 * Module:          DevilEnemey
 * Responsibility:  Handles the Devil enemny.
 */

export default class DevilEnemy extends BaseEnemy {

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
        Mutators.Frame.setColor(this.explosion.particleFrames[0], CGAColors.white);
        Mutators.Frame.setColor(this.explosion.particleFrames[1], CGAColors.white);
    }

    /**
     * Update the Devil state.
     * @param tick
     */
    public updateState(tick: number): void {
        super.updateState(tick);
        this.dispatchCurrentState();
    }

    /**
     * Called when a frame change is required. The Devil frames are all colored at initialisation so we can keep this simple.
     */
    protected onFrameChange(): void {
        const nextFrame = this.frameProvider.getCurrentFrame();
        Mutators.Frame.convertHexToCGA(nextFrame);
        this.currentFrame = nextFrame;
    }

    /**
     * Returns the points of the Devil enemy.
     * @returns {number}.
     */
    public getPoints(): number {
        return 100;
    }
}
