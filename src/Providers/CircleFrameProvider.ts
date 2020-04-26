/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          FrameProvider
 * Responsibility:  Provide frames for animations.
 */

import BaseFrameProvider from "../Base/BaseFrameProvider";
import { Frame } from "../Types/Types";

export default class CircleFrameProvider extends BaseFrameProvider {

    /**
     * Returns the next frame using clockwise rotation.
     */
    public getNextFrameClone(): Frame {
        this.frameIndex += 1;

        if (this.frameIndex > this.maxIndex) {
            this.frameIndex = 0;
        }

        return this.getCurrentFrameCopy();
    }
}