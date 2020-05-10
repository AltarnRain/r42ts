/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseFrameProvider from "../../Base/BaseFrameProvider";
import { Frame } from "../../Types";

/**
 * Module:          Immobole Frame probider
 * Responsibility:  Always returns the frame using the initial index
 */

export class ImmoboleFrameProvider extends BaseFrameProvider {
    public getNextFrame(): Frame {
        return super.getCurrentFrame();
    }
}