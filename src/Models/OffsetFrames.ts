/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Frame from "../Types/Frame";
import GameLocation from "./GameLocation";
import GameSize from "./GameSize";

/**
 * Module:          OffsetFrames
 * Responsibility:  Model for frames that require offsets to be drawn correctly.
 */

export interface OffsetFrames {
    /**
     * Frames to draw.
     */
    frames: Frame[];

    /**
     * Offsets used to render the object on screen.
     */
    offSets: GameLocation[];

    /**
     * The maximum dimensions of the frames.
     */
    maxSizes: GameSize;
}