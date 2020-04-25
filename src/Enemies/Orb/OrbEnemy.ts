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
import { BaseEnemy } from "../../Base/BaseEnemy";
import BaseLocationProvider from "../../Base/BaseLocationProvider";
import CGAColors from "../../Constants/CGAColors";
import TickHandler from "../../Handlers/TickHandler";
import GameLocation from "../../Models/GameLocation";
import CircleFrameProvider from "../../Providers/CircleFrameProvider";
import dimensionProvider from "../../Providers/DimensionProvider";
import { Frame } from "../../Types/Types";
import { convertChangingFrameColors, convertFramesColors } from "../../Utility/Frame";
import { cloneObject } from "../../Utility/Lib";
import orbFrames from "./OrbFrames";

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
    constructor(startLocation: GameLocation, frameChangeTime: number, locationProvider: BaseLocationProvider, canFire: () => boolean) {
        super(startLocation, frameChangeTime, orbFrames, Explosion02, locationProvider, canFire);

        // The frame probider is required by base objects. It won't do anything in this enemy since it has just one frame.
        this.frameProvider = new CircleFrameProvider(this.offSetFrames.frames, 0);

        // We only have one frame in this enemy but its color DOES change. Set the currentFrame to the only available one
        // and sets its color to the first color set so we get a a good render when the enemy first appears.
        this.currentFrame = cloneObject(orbFrames.frames[0]);
        this.setFrameColor(this.currentFrame);

        // Very important for this enemey. It'll handle the color transition of the single frame.
        this.colorTickHandler = new TickHandler(100, () => this.onColorChange());
    }

    /**
     * Called by a TickHandler when the bird should change color.
     */
    private onColorChange(): void {
        const coloredFrame = cloneObject(this.offSetFrames.frames[0]);

        this.currentColorIndex++;
        if (this.currentColorIndex >= colors.length) {
            this.currentColorIndex = 0;
        }

        this.setFrameColor(coloredFrame);
    }

    private setFrameColor(coloredFrame: Frame) {
        const randomColors = colors[this.currentColorIndex];
        convertChangingFrameColors(coloredFrame, randomColors);
        this.currentFrame = coloredFrame;
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
        return 0;
    }

    /**
     * TODO: This enemy fires on any difficulty.
     * @param {number} tick. Current tick.s
     */
    protected getBulletParticle(tick: number): undefined {
        return undefined;
    }
}