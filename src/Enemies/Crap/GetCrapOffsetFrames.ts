/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetCrapOffsetFrames
 * Responsibility:  Define the frames of the Crap enemy.
 */

export default function getCrapOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["0", "E", "E", "E", "0"],
                ["E", "1", "1", "1", "E"],
                ["E", "F", "1", "F", "E"],
                ["E", "1", "1", "1", "E"],
                ["E", "E", "0", "E", "E"],
            ],
            [
                ["0", "E", "E", "E", "0"],
                ["E", "1", "1", "1", "E"],
                ["E", "F", "1", "F", "E"],
                ["E", "1", "1", "1", "E"],
                ["0", "E", "0", "E", "0"],
                ["E", "0", "0", "0", "E"],
            ], [
                ["0", "E", "E", "E", "0"],
                ["E", "1", "1", "1", "E"],
                ["E", "F", "1", "F", "E"],
                ["E", "1", "1", "1", "E"],
                ["0", "E", "0", "E", "0"],
                ["0", "E", "0", "E", "0"],
            ], [
                ["0", "E", "E", "E", "0"],
                ["E", "1", "1", "1", "E"],
                ["E", "F", "1", "F", "E"],
                ["E", "1", "1", "1", "E"],
                ["0", "E", "E", "E", "0"],
            ],
        ],
        offSets: [],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
