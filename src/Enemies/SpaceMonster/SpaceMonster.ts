/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetSpacemonsterOffsetFrames
 * Responsibility:  Returns the requires
 */

export function getSpaceMonsterOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["7", "7"],
                ["7", "7"],
                ["7", "7"],
                ["7", "7"],
                ["7", "7"],
            ],
            [
                ["0", "0", "7", "7", "0", "0"],
                ["0", "0", "7", "7", "0", "0"],
                ["0", "0", "7", "7", "0", "0"],
                ["0", "7", "0", "0", "7", "0"],
                ["7", "0", "0", "0", "0", "7"],
            ]
        ],
        offSets: [
            {
                left: 2,
                top: 0
            },
            {
                left: 0,
                top: 0
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
