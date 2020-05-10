/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";

/**
 * Module:          SpinnerFrames
 * Responsibility:  Define the frames of the spinner enemy.
 */

export function getSpinnerFrames(): OffsetFrames {
    return {
        frames: [
            [
                ["0", "A", "0"],
                ["0", "C", "0"],
                ["0", "A", "0"],
            ],
            [
                ["0", "0", "A"],
                ["0", "C", "0"],
                ["A", "0", "0"],
            ],
            [
                ["0", "0", "0"],
                ["A", "C", "A"],
                ["0", "0", "0"],
            ],
            [
                ["A", "0", "0"],
                ["0", "C", "0"],
                ["0", "0", "A"],
            ]
        ],
        offSets: []
    };
}
