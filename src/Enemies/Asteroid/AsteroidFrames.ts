/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";

/**
 * Module:          BalloonFrames
 * Responsibility:  Define the frames of the Balloon enemy.
 */

export function getAsteroidFrames(): OffsetFrames {
    return {
        frames: [
            [
                ["0", "0", "6", "6", "0", "0"],
                ["0", "6", "6", "6", "6", "0"],
                ["6", "6", "6", "6", "6", "6"],
                ["6", "6", "6", "6", "6", "6"],
                ["0", "6", "6", "6", "6", "0"],
                ["0", "0", "6", "6", "0", "0"],
            ]
        ],
        offSets: []
    };
}
