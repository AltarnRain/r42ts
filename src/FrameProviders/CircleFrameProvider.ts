/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseFrameProvider from "../Base/BaseFrameProvider";
import { Frame } from "../Types";

/**
 * Module:          CircleFrameProvider
 * Responsibility:  Provides frame one after another, if the last frame is given it resets to the first.
 */

export default class CircleFrameProvider extends BaseFrameProvider {

    /**
     * Returns the next frame using clockwise rotation.
     * @returns {Frame}. A frame.
     */
    public getNextFrame(): Frame {
        this.frameIndex += 1;

        if (this.frameIndex > this.maxIndex) {
            this.frameIndex = 0;
        }

        return this.getCurrentFrame();
    }
}