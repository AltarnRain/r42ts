/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetDiaboloOffsetFrames
 * Responsibility:  Define the frames of the diabolo enemy.
 */

export default function getDiaboloOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
                ["4", "0", "0", "0"],
                ["4", "0", "0", "0"],
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
            ],
            [
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
                ["0", "4", "0", "0"],
                ["0", "4", "0", "0"],
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
            ],
            [
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
                ["0", "0", "4", "0"],
                ["0", "0", "4", "0"],
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
            ],
            [
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
                ["0", "0", "0", "4"],
                ["0", "0", "0", "4"],
                ["9", "9", "9", "9"],
                ["9", "9", "9", "9"],
            ],
        ],
        offSets: [],
        maxSizes: { width: 0, height: 0}
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
