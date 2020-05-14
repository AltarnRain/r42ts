/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import CGAColors from "../../Constants/CGAColors";
import ILocationDirectionProvider from "../../Interfaces/ILocationDirectionProvider";
import { ExplosionProviderFunction, OffsetFramesProviderFunction } from "../../Types";
import Mutators from "../../Utility/FrameMutators";
import { Points } from "../../Constants/Constants";

/**
 * Module:          DevilEnemey
 * Responsibility:  Handles the Devil enemny.
 */

export default class DevilEnemy extends BaseEnemy {

    /**
     * A location provider than also provides a method that gives the general direction: left or right.
     */
    private locationDirecntionProvider: ILocationDirectionProvider;

    /**
     * Constuct the devil.
     */
    constructor(
        frameChangeTime: number,
        getFrames: OffsetFramesProviderFunction,
        getExplosion: ExplosionProviderFunction,
        locationProvider: ILocationDirectionProvider,
        frameProvider: BaseFrameProvider) {
        super(
            frameChangeTime,
            getFrames,
            getExplosion,
            locationProvider,
            frameProvider);

        Mutators.Frame.convertHexToCGA(this.explosion.explosionCenterFrame);
        this.explosion.particleFrames.forEach((pf) => Mutators.Frame.convertHexToCGA(pf));

        this.locationDirecntionProvider = locationProvider;
    }

    /**
     * Update the Devil state.
     * @param {number} tick. Current tick
     */
    public updateState(tick: number): void {
        super.updateState(tick);

        if (this.locationDirecntionProvider.getDirection() === "left") {
            // Frame going left is index 0, there's two frames so a get next frames switches to the
            // frame of the devil heading right.
            if (this.frameProvider.getCurrentIndex() !== 0) {
                this.frameProvider.getNextFrame();
            }
        } else if (this.locationDirecntionProvider.getDirection() === "right") {
            // Frame going left is index 0, there's two frames so a get next frames switches to the
            // frame of the devil heading right.
            if (this.frameProvider.getCurrentIndex() !== 1) {
                this.frameProvider.getNextFrame();
            }
        }

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
        return Points.devil;
    }
}
