/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetDevilOffsetFrames
 * Responsibility:  Define the frames of the Devil enemy.
 */

export default function getDevilOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["0", "4", "4", "0"],
                ["4", "4", "4", "4"],
                ["A", "4", "A", "4"],
                ["4", "4", "4", "4"],
                ["4", "4", "4", "4"],
                ["4", "0", "4", "0"],
                ["4", "0", "4", "0"],
            ],
            [
                ["0", "4", "4", "0"],
                ["4", "4", "4", "4"],
                ["4", "A", "4", "A"],
                ["4", "4", "4", "4"],
                ["4", "4", "4", "4"],
                ["0", "4", "0", "4"],
                ["0", "4", "0", "4"],
            ]
        ],
        offSets: [],
        maxSizes: { width: 0, height: 0}
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
