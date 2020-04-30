/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import IFrameProvider from "../Base/BaseFrameProvider";
import { Frame } from "../Types";

/**
 * Module:          FrameProvider
 * Responsibility:  Provide frames for animations.
 */

export default class BackAndForthFrameProvider extends IFrameProvider {

    /**
     * Returns the current frame and sets the next one. Goes back and forth between frames.
     * @returns {Frame}. A frame.
     */
    public getNextFrame(): Frame {
        this.frameIndex += this.add;

        if (this.frameIndex > this.maxIndex) {
            this.frameIndex = this.maxIndex;
        }

        if ((this.frameIndex === this.maxIndex) || this.frameIndex === 0) {
            this.add *= -1;
        }

        return  this.getCurrentFrame();
    }
}