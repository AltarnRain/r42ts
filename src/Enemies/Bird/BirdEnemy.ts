/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import CGAColors from "../../Constants/CGAColors";
import { ColorSchemes, Points } from "../../Constants/Constants";
import TickHandler from "../../Handlers/TickHandler";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import ExplosionProviderFunction from "../../ShipsToFireProviders/ExplosionProviderFunction";
import Frame from "../../Types/Frame";
import OffsetFramesProviderFunction from "../../Types/OffsetFramesProviderFunction";
import { getRandomArrayElement } from "../../Utility/Array";
import Mutators from "../../Utility/FrameMutators";

/**
 * Module:          Bird enemy
 * Responsibility:  Defines the behaviour of the bird enemy first seen in level 1.
 */

export default class BirdEnemy extends BaseEnemy {

    /**
     * Hanels color changes.
     */
    private colorTickHandler: TickHandler;

    /**
     * Creates the object.
     */
    constructor(
        frameChangeTime: number,
        getOffsetFrames: OffsetFramesProviderFunction,
        getExplosion: ExplosionProviderFunction,
        locationProvider: ILocationProvider,
        frameProvider: BaseFrameProvider) {
        super(
            frameChangeTime,
            getOffsetFrames,
            getExplosion,
            locationProvider,
            frameProvider);

        this.colorTickHandler = new TickHandler(40, () => this.onColorChange());

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, CGAColors.white);
        this.explosion.particleFrames.forEach((pf) => Mutators.Frame.setColor(pf, CGAColors.white));
    }

    /**
     * change the birds color.
     * @param {number} tick. Current tick
     */
    public alterState(tick: number): void {
        this.colorTickHandler.tick(tick);
    }

    /**
     * Returns the points for the bird.
     * @returns {number}. Points rewarded when the BirdEnemy is destroyed.
     */
    public getPoints(): number {
        return Points.bird;
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        const currentFrame = this.frameProvider.getCurrentFrame();
        this.setCurrentFrameColor(currentFrame);
    }

    /**
     * Sets the current's frame color
     * @param {Frame} frame. Frame to set the color on.
     */
    private setCurrentFrameColor(frame: Frame) {
        Mutators.Frame.setColor(frame, getRandomArrayElement(ColorSchemes.birds));
        this.currentFrame = frame;
    }

    /**
     * Changes the frame of the OrbEnemy. Also ensures the new frame is given colors.
     */
    protected onFrameChange(): void {
        const nextFrame = this.frameProvider.getNextFrame();
        this.setCurrentFrameColor(nextFrame);
    }
}