/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseFrameProvider from "../Base/BaseFrameProvider";
import { Frame } from "../Types/Frame";

/**
 * Module:          OneFrameProvider
 * Responsibility:  Always the current frame. Useful for debugging.
 */

export default class OneFrameProvider extends BaseFrameProvider {

    /**
     * Returns the current frame and only the current frame.
     * @returns {Frame}. A frame.
     */
    public getNextFrame(): Frame {
        return this.getCurrentFrame();
    }
}