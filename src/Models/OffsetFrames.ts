/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frames } from "../Types";
import { GameLocation } from "./GameLocation";

/**
 * Module:          OffsetFrames
 * Responsibility:  Model for frames that require offsets to be drawn correctly.
 */

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