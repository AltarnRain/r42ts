/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
import { getExplosion02 } from "../../SharedFrames/Explosion02";
import { FireAngleProviderFunction, Frame } from "../../Types/Types";
import Mutators from "../../Utility/FrameMutators";
import getOrbFrames from "./OrbFrames";

/**
 * Module:          OrbEnemy
 * Responsibility:  Define behaviour of the orb enemy.
 */
const colors: string[][] = [
    [CGAColors.lightGreen, CGAColors.lightBlue],
    [CGAColors.brown, CGAColors.lightGreen],
    [CGAColors.lightBlue, CGAColors.white],
    [CGAColors.white, CGAColors.brown],
];

export default class OrbEnemy extends BaseEnemy {
    /**
     * Handles the color change ticks.
     */
    private colorTickHandler: TickHandler;

    /**
     * Tracks the current color index.
     */
    private currentColorIndex = 0;

    /**
     * Construct the enemy.
     */
    constructor(left: number, top: number, frameChangeTime: number, locationProvider: BaseLocationProvider, frameProvider: BaseFrameProvider, angleProvider?: FireAngleProviderFunction) {
        super(left, top, frameChangeTime, getOrbFrames, getExplosion02, locationProvider, frameProvider, angleProvider);

        // We only have one frame in this enemy but its color DOES change. Set the currentFrame to the only available one
        // and sets its color to the first color set so we get a a good render when the enemy first appears.
        this.updateCurrentFrameAndColor(this.frameProvider.getCurrentFrame());

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, CGAColors.magenta);
        Mutators.Frames.setColor(this.explosion.particleFrames, CGAColors.magenta);

        this.colorTickHandler = new TickHandler(50, () => this.onColorChange());

        this.onFrameChange();
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        this.currentColorIndex++;
        if (this.currentColorIndex >= colors.length) {
            this.currentColorIndex = 0;
        }

        this.updateCurrentFrameAndColor(this.frameProvider.getCurrentFrame());
    }

    /**
     * Sets the current frame and its color.
     * @param {Frame} frame. A frame.
     */
    private updateCurrentFrameAndColor(frame: Frame): void {
        const currentColor = colors[this.currentColorIndex];
        if (currentColor === undefined) {
            throw new Error("Color cannot be undefined.");
        }

        Mutators.Frame.setColor(frame, ...currentColor);
        this.currentFrame = frame;
    }

    /**
     * Changes the frame of the OrbEnemy. Also ensures the new frame is given colors.
     */
    protected onFrameChange(): void {
        const frame = this.frameProvider.getNextFrame();
        this.updateCurrentFrameAndColor(frame);
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
     * Returns the points of this enemy.
     * @returns {number}. The points.
     */
    public getPoints(): number {
        return 200;
    }
}