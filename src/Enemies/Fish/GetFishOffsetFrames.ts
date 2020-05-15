/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetFishOffsetFrames
 * Responsibility:  Define the frames of the Fish enemy.
 */

export default function getFishOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["0", "0", "0", "0", "0", "A"],
                ["0", "0", "0", "0", "B", "0"],
                ["0", "0", "0", "7", "7", "0"],
                ["0", "0", "C", "C", "C", "C"],
                ["0", "E", "E", "E", "E", "0"],
                ["D", "D", "D", "D", "D", "D"],
                ["0", "E", "E", "E", "E", "0"],
                ["0", "0", "C", "C", "C", "C"],
                ["0", "0", "0", "7", "7", "0"],
                ["0", "0", "0", "0", "B", "0"],
                ["0", "0", "0", "0", "0", "A"],
            ],
        ],
        offSets: [],
        maxSizes: { width: 0, height: 0}
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}

