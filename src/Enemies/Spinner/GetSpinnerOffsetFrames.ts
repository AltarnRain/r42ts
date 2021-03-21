/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetSpinnerOffsetFrames
 * Responsibility:  Define the frames of the spinner enemy.
 */

export default function getSpinnerOffsetFrames(): OffsetFrames {
    const resource = {
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
        offSets: [],
        maxSizes: { width: 0, height: 0}
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
