/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Bird enemy
 * Responsibility:  Defines the behaviour of the bird enemy first seen in level 1.
 */

import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
import Particle from "../../Particles/Particle";
import Explosion01 from "../../SharedFrames/Explosion01";
import { FireAngleProviderFunction, Frame } from "../../Types/Types";
import { getRandomArrayElement } from "../../Utility/Array";
import Mutators from "../../Utility/FrameMutators";
import getBirdFrames from "./BirdFrames";

const colors = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];

export default class BirdEnemy extends BaseEnemy {

    /**
     * Hanels color changes.
     */
    private colorTickHandler: TickHandler;

    /**
     * Creates the object.
     */
    constructor(left: number, top: number, frameChangetime: number, locationProvider: BaseLocationProvider, frameProvider: BaseFrameProvider, fireAngleProvider?: FireAngleProviderFunction) {
        super(left, top, frameChangetime, getBirdFrames, Explosion01, locationProvider, frameProvider, fireAngleProvider);

        this.colorTickHandler = new TickHandler(40, () => this.onColorChange());

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, CGAColors.white);
        Mutators.Frame.setColor(this.explosion.particleFrames[0], CGAColors.white);
        Mutators.Frame.setColor(this.explosion.particleFrames[1], CGAColors.white);
    }

    /**
     * Updates the objects state.
     * @param {tick: number} tick. Current tick.
     */
    public updateState(tick: number): void {
        super.updateState(tick);

        this.colorTickHandler.tick(tick);
    }

    /**
     * Returns the frame of the birds bullet.
     */
    public getBulletFrame(): Frame {
        // TODO: Implement.
        return {} as Frame;
    }

    /**
     * Returns the points for the bird.
     * @returns {number}. Points rewarded when the BirdEnemy is destroyed.
     */
    public getPoints(): number {
        return 200;
    }

    /**
     * Returns a bullet particle.
     * @returns {Particle}. Bullet particle of the BirdEnemy.
     */
    protected getBulletParticle(): Particle {
        // TODO: Bird will fire diagolan bullets on hard mode.
        return {} as Particle;
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        const currentFrame = this.frameProvider.getCurrentFrameCopy();
        this.setCurrentFrameColor(currentFrame);
    }

    /**
     * Sets the current's frame color
     * @param {Frame} frame. Frame to set the color on.
     */
    private setCurrentFrameColor(frame: Frame) {
        Mutators.Frame.setColor(frame, getRandomArrayElement(colors));
        this.currentFrame = frame;
    }

    /**
     * Changes the frame of the OrbEnemy. Also ensures the new frame is given colors.
     */
    protected onFrameChange(): void {
        const nextFrame = this.frameProvider.getNextFrameClone();
        this.setCurrentFrameColor(nextFrame);
    }
}