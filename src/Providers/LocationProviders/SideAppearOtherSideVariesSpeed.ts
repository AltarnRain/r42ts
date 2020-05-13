/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import ILocationProvider from "../../Interfaces/ILocationProvider";
import { GameLocation } from "../../Models/GameLocation";
import { getNextLocationWithinBoundaries } from "../../Utility/Location";
import dimensionProvider from "../DimensionProvider";
import IGetCurrentIndex from "../../Base/IGetCurrentFrame";

/**
 * Module:          SideAppearOtherSideVariesSpeed
 * Responsibility:  A location provider where the enemies move to one side and reappear at the other side, but depending on the current frame have different movement
 *                  speeds
 */

const {
    gameField
} = dimensionProvider();

export default class SideAppearOtherSideVariesSpeed implements ILocationProvider {

    /**
     * A function that returns the index of the frame currently being rendered.
     */
    private indexProvider: IGetCurrentIndex;

    /**
     * Left position.
     */
    private left: number;

    /**
     * Top position\.
     */
    private top: number;

    /**
     * Movement angle.
     */
    private angle: number;

    /**
     * Object width.
     */
    private width: number;

    /**
     * Maximum top position.
     */
    private maxTop: number;

    /**
     * Maximum bottom position.
     */
    private maxBottom: number;

    /**
     * Initial slow speed.
     */
    private baseSlowSpeed: number;

    /**
     * Initial fast speed.
     */
    private baseFastSpeed: number;

    /**
     * Current slow speed.
     */
    private slowSpeed: number;

    /**
     * Current fast speed.
     */
    private fastSpeed: number;

    /**
     * Frame indexes where to use the slow speed.
     */
    private slowFrames: number[];

    /**
     * Frame indexes where to use the fast speed.
     */
    private fastFrames: number[];
    /**
     *
     */
    constructor(
        left: number,
        top: number,
        angle: number,
        width: number,
        maxTop: number,
        maxBottom: number,
        indexProvider: IGetCurrentIndex,
        slowSpeed: number,
        fastSpeed: number,
        slowFrames: number[],
        fastFrames: number[]) {

        this.left = left;
        this.top = top;
        this.angle = angle;
        this.width = width;
        this.maxTop = maxTop;
        this.maxBottom = maxBottom;
        this.indexProvider = indexProvider;

        this.baseSlowSpeed = slowSpeed;
        this.baseFastSpeed = fastSpeed;

        this.slowSpeed = slowSpeed;
        this.fastSpeed = fastSpeed;

        this.slowFrames = slowFrames;
        this.fastFrames = fastFrames;
    }

    public getCurrentLocation(): GameLocation {
        return { left: this.left, top: this.top };

    }
    public updateState(tick?: number | undefined): void {
        const currentFrameIndex = this.indexProvider.getCurrentIndex();

        let speed = 0;
        if (this.slowFrames.indexOf(currentFrameIndex) > -1) {
            speed = this.slowSpeed;
        } else if (this.fastFrames.indexOf(currentFrameIndex) > -1) {
            speed = this.fastSpeed;
        } else {
            throw new Error("Index " + currentFrameIndex + " was not found in the slowFrames or fastFrames array");
        }

        const { left, top } = getNextLocationWithinBoundaries(
            this.left,
            this.top,
            this.width,
            this.angle,
            speed,
            this.maxTop,
            this.maxBottom
        );

        this.left = left;
        this.top = top;
    }

    /**
     * increases the speed by the provided factor.
     * @param {number} factor.
     */
    public increaseSpeed(factor: number): void {
        this.slowSpeed = this.baseSlowSpeed * factor;
        this.fastSpeed = this.baseFastSpeed * factor;
    }
}