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
            [ // going left
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
            [ // going right
                ["A", "0", "0", "0", "0", "0"],
                ["0", "B", "0", "0", "0", "0"],
                ["0", "7", "7", "0", "0", "0"],
                ["C", "C", "C", "C", "0", "0"],
                ["0", "E", "E", "E", "E", "0"],
                ["D", "D", "D", "D", "D", "D"],
                ["0", "E", "E", "E", "E", "0"],
                ["C", "C", "C", "C", "0", "0"],
                ["0", "7", "7", "0", "0", "0"],
                ["0", "B", "0", "0", "0", "0"],
                ["A", "0", "0", "0", "0", "0"],
            ],
            [ // Fires
                ["A", "A"],
                ["B", "B"],
                ["7", "7"],
                ["C", "C"],
                ["E", "E"],
                ["D", "D"],
                ["E", "E"],
                ["C", "C"],
                ["7", "7"],
                ["B", "B"],
                ["A", "A"],
            ],
        ],
        offSets: [
            {
                left: 0,
                top: 0,
            },
            {
                left: 0,
                top: 0
            },
            {
                left: 2,
                top: 0
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}