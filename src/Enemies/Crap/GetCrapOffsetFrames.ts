/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
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
        offSets: [
            {
                left: -2,
                top: 0,
            },
            {
                left: 0,
                top: 0
            },
            {
                left: 2,
                top: 0,
            },
            {
                left: 1,
                top: 0,
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    // Double the frames. The first frames wobble, the last frames do not.
    resource.frames = [
        ...resource.frames,
        ...resource.frames.reverse(),
    ];

    return resource;
}
