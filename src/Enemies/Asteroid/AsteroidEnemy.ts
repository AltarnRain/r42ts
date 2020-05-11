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
 * Module:          AsteroidEnemy
 * Responsibility:  An asteroid. A piece of rock really.
 */

export class AsteroidEnemy extends BaseEnemy {

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

    public updateState(tick: number): void {
        super.updateState(tick);

        this.dispatchCurrentState();
    }

    public getPoints(): number {
        return 300;
    }

    public getHitpoints(): number {
        return 4;
    }

    protected onFrameChange(): void {
        const newFrame = this.frameProvider.getCurrentFrame();
        Mutators.Frame.convertHexToCGA(newFrame);
        this.currentFrame = newFrame;
    }
}