/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          OffsetFrames
 * Responsibility:  Model for frames that require offsets to be drawn correctly.
 */

import { Frames } from "../Types/Types";
import GameLocation from "./GameLocation";

export interface OffsetFrames {
    /**
     * Frames to draw.
     */
    frames: Frames;

    /**
     * Offsets user to render the object on screen.
     */
    offSets: GameLocation[];
}