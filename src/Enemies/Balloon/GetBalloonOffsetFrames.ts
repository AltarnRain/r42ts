/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetBalloonOffsetFrames
 * Responsibility:  Define the offset frames of the Balloon enemy.
 */

export default function getBalloonOffsetFrames(): OffsetFrames {
    const resource = {
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
        offSets: [],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
