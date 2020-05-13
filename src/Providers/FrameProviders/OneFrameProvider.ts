/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseFrameProvider from "../../Base/BaseFrameProvider";
import { Frame } from "../../Types";

/**
 * Module:          FrameProvider
 * Responsibility:  Provide frames for animations.
 */

export default class OneFrameProvider extends BaseFrameProvider {

    /**
     * Returns the current frame and sets the next one. Goes back and forth between frames.
     * @returns {Frame}. A frame.
     */
    public getNextFrame(): Frame {
        this.frameIndex = 0;
        return this.getCurrentFrame();
    }
}