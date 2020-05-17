/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from "../../Base/BaseEnemy";
import BaseFrameProvider from "../../Base/BaseFrameProvider";
import CGAColors from "../../Constants/CGAColors";
import { Locations } from "../../Constants/Constants";
import TickHandler from "../../Handlers/TickHandler";
import ILocationProvider from "../../Interfaces/ILocationProvider";
import dimensionProvider from "../../Providers/DimensionProvider";
import { ExplosionProviderFunction, Frame, OffsetFramesProviderFunction } from "../../Types";
import { getFrameDimensions } from "../../Utility/Frame";
import Mutators from "../../Utility/FrameMutators";

/**
 * Module:          OrbEnemy
 * Responsibility:  Define behaviour of the orb enemy.
 */

// The orb constantly varies between a specific set of color combinations. This array is used to set them.
const colors: string[][] = [
    [CGAColors.lightGreen, CGAColors.lightBlue],
    [CGAColors.brown, CGAColors.lightGreen],
    [CGAColors.lightBlue, CGAColors.white],
    [CGAColors.white, CGAColors.brown],
];

const {
    gameField
} = dimensionProvider();

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

        // We only have one frame in this enemy but its color DOES change. Set the currentFrame to the only available one
        // and sets its color to the first color set so we get a a good render when the enemy first appears.
        this.updateCurrentFrameAndColor(this.frameProvider.getCurrentFrame());

        Mutators.Frame.setColor(this.explosion.explosionCenterFrame, CGAColors.magenta);
        this.explosion.particleFrames.forEach((pf) => Mutators.Frame.setColor(pf, CGAColors.magenta));

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
     * Handle some color changes and animation stuff.
     * @param {number} tick;
     */
    public alterState(tick: number): void {
        this.colorTickHandler.tick(tick);

        if (this.currentFrame) {
            const { height } = getFrameDimensions(this.currentFrame);
            const { top } = this.locationProvider.getCurrentLocation();
            const offset = top - this.offsetTop;

            if (this.offsetTop < gameField.top) {
                this.offsetTop = Locations.Orb.maxBottom - offset;
            } else if (this.offsetTop + height > Locations.Orb.maxBottom) {
                this.offsetTop = gameField.top + offset;
            }
        }
    }

    /**
     * Returns the points of this enemy.
     * @returns {number}. The points.
     */
    public getPoints(): number {
        return 200;
    }
}