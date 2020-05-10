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

export function getBalloonFrames(): OffsetFrames {
    return {
        frames: [
            [
                ["0", "E", "E", "E", "E", "0"],
                ["A", "E", "E", "E", "E", "A"],
                ["A", "E", "E", "E", "E", "A"],
                ["0", "E", "E", "E", "E", "0"],
                ["0", "0", "E", "E", "0", "0"],
            ],
            [
                ["0", "E", "E", "E", "E", "0"],
                ["A", "A", "E", "E", "E", "E"],
                ["A", "A", "E", "E", "E", "E"],
                ["0", "E", "E", "E", "E", "0"],
                ["0", "0", "E", "E", "0", "0"],
            ],
            [
                ["0", "E", "E", "E", "E", "0"],
                ["E", "A", "A", "E", "E", "E"],
                ["E", "A", "A", "E", "E", "E"],
                ["0", "E", "E", "E", "E", "0"],
                ["0", "0", "E", "E", "0", "0"],
            ],
            [
                ["0", "E", "E", "E", "E", "0"],
                ["E", "E", "A", "A", "E", "E"],
                ["E", "E", "A", "A", "E", "E"],
                ["0", "E", "E", "E", "E", "0"],
                ["0", "0", "E", "E", "0", "0"],
            ],
            [
                ["0", "E", "E", "E", "E", "0"],
                ["E", "E", "E", "A", "A", "E"],
                ["E", "E", "E", "A", "A", "E"],
                ["0", "E", "E", "E", "E", "0"],
                ["0", "0", "E", "E", "0", "0"],
            ],
            [
                ["0", "E", "E", "E", "E", "0"],
                ["E", "E", "E", "E", "A", "A"],
                ["E", "E", "E", "E", "A", "A"],
                ["0", "E", "E", "E", "E", "0"],
                ["0", "0", "E", "E", "0", "0"],
            ],
        ],
        offSets: []
    };
}
