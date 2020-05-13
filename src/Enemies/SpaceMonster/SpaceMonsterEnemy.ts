/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import CGAColors from "../../Constants/CGAColors";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import dimensionProvider from "../../Providers/DimensionProvider";
import { ExplosionProviderFunction, OffsetFramesProviderFunction } from "../../Types";
import Mutators from "../../Utility/FrameMutators";
import { getRandomArrayElement } from "../../Utility/Array";

/**
 * Module:          SpaceMonster
 * Responsibility:  Opens its mouth when it gets to the bottom of the screen.
 */

const {
    pixelSize
} = dimensionProvider();

const jawsOpenTop = pixelSize * 55;

const explosionColors = [
    CGAColors.yellow,
    CGAColors.lightGreen,
    CGAColors.lightBlue,
]

export class SpaceMonster extends BaseEnemy {

    /**
     * Flag used to track if the jaws of the Space Monster are open or not.
     */
    private jawsClosed = true;

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

        const color = getRandomArrayElement(explosionColors);
        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, color);
        this.explosion.particleFrames.forEach((pf) => Mutators.Frame.setColor(pf, color));
    }

    public updateState(tick: number): void {
        super.updateState(tick);

        // When the Space monster gets close to the bottom it opens its jaws.
        if (this.offsetTop >= jawsOpenTop && this.jawsClosed) {
            this.frameProvider.getNextFrame();
            this.jawsClosed = false;
        } else if (this.offsetTop < jawsOpenTop && this.jawsClosed === false) {
            this.frameProvider.getNextFrame();
            this.jawsClosed = true;
        }

        this.dispatchCurrentState();
    }

    public getPoints(): number {
        return 300;
    }

    /**
     * Frame change handler.
     */
    protected onFrameChange(): void {

        // The Leanasteroid is an odd duck here. It doesn't change frames to be animated
        // but to show damage to it.
        // So, we return the current frame and change the frame when the astroid is hit.
        const newFrame = this.frameProvider.getCurrentFrame();
        Mutators.Frame.convertHexToCGA(newFrame);
        this.currentFrame = newFrame;
    }
}