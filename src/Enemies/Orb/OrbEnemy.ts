/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          OrbEnemy
 * Responsibility:  Define behaviour of the orb enemy.
 */

import Explosion02 from "../../Assets/Explosion02";
import { twoPXBullet } from "../../Assets/twoPXBullet";
import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
import GameLocation from "../../Models/GameLocation";
import CircleFrameProvider from "../../Providers/CircleFrameProvider";
import { AngleProviderFunction, Frame } from "../../Types/Types";
import { convertChangingFrameColors, convertVariableFrameColor, convertVariableFramesColor } from "../../Utility/Frame";
import { cloneObject } from "../../Utility/Lib";
import orbFrames from "./OrbFrames";
import BaseFrameProvider from "../../Base/BaseFrameProvider";

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
     * Orb enemy's bullet frame.
     */
    private bulletFrameClone: Frame;

    /**
     * Construct the enemy.
     */
    constructor(startLocation: GameLocation, frameChangeTime: number, locationProvider: BaseLocationProvider, frameProvider: BaseFrameProvider, angleProvider?: AngleProviderFunction) {
        super(startLocation, frameChangeTime, orbFrames, Explosion02, locationProvider, frameProvider, angleProvider);

        // We only have one frame in this enemy but its color DOES change. Set the currentFrame to the only available one
        // and sets its color to the first color set so we get a a good render when the enemy first appears.
        this.updateCurrentFrameAndColor();

        convertVariableFrameColor(this.explosionClone.explosionCenterFrame, CGAColors.magenta);
        convertVariableFramesColor(this.explosionClone.particleFrames, CGAColors.magenta);

        this.bulletFrameClone = cloneObject(twoPXBullet);
        convertVariableFrameColor(this.bulletFrameClone, CGAColors.lightRed);

        this.colorTickHandler = new TickHandler(100, () => this.onColorChange());
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        this.currentColorIndex++;
        if (this.currentColorIndex >= colors.length) {
            this.currentColorIndex = 0;
        }

        this.updateCurrentFrameAndColor();
    }

    /**
     * Sets the current frame and its color.
     * @param {Frame} frame. A frame.
     */
    private updateCurrentFrameAndColor() {
        const newColor = colors[this.currentColorIndex];
        const frame = cloneObject(this.offSetFramesClone.frames[0]);

        if (newColor === undefined) {
            throw new Error("Color cannot be undefined.");
        }

        convertChangingFrameColors(frame, newColor);
        this.currentFrameClone = frame;
    }

    /**
     * Changes the frame of the OrbEnemy. Also ensures the new frame is given colors.
     */
    protected onFrameChange(): void {
        const newFrame = this.frameProvider.getNextFrameClone();
        const currentColors = colors[this.currentColorIndex];

        // Apply currnet colors when the frame changes.
        // The color will be updated when the color tich handler fires.
        convertChangingFrameColors(newFrame, currentColors);

        this.currentFrameClone = newFrame;
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