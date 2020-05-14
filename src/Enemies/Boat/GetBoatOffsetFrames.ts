/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetBoatOffsetFrames
 * Responsibility:  Define the frames of the Boat enemy.
 */

export default function getBoatOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["E", "0", "C", "C", "C", "C", "0", "0"],
                ["0", "E", "0", "0", "A", "A", "A", "0"],
                ["E", "0", "0", "0", "0", "0", "0", "A"],
                ["0", "E", "0", "0", "A", "A", "A", "0"],
                ["E", "0", "C", "C", "C", "C", "0", "0"],
            ],
            [
                ["0", "E", "C", "C", "C", "C", "0", "0"],
                ["E", "0", "0", "0", "A", "A", "A", "0"],
                ["0", "E", "0", "0", "0", "0", "0", "A"],
                ["E", "0", "0", "0", "A", "A", "A", "0"],
                ["0", "E", "C", "C", "C", "C", "0", "0"],
            ]

        ],
        offSets: [],
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
