/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetAsteroidOffsetFrames
 * Responsibility:  Returns the requires
 */

export function getAsteroidOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["0", "0", "6", "6", "0", "0"],
                ["0", "6", "6", "6", "6", "0"],
                ["6", "6", "6", "6", "6", "6"],
                ["6", "6", "6", "6", "6", "6"],
                ["0", "6", "6", "6", "6", "0"],
                ["0", "0", "6", "6", "0", "0"],
            ],
            [
                ["0", "0", "6", "6", "0", "0"],
                ["0", "6", "6", "6", "6", "0"],
                ["6", "6", "C", "C", "6", "6"],
                ["6", "6", "C", "C", "6", "6"],
                ["0", "6", "6", "6", "6", "0"],
                ["0", "0", "6", "6", "0", "0"],
            ],
            [
                ["0", "0", "6", "6", "0", "0"],
                ["0", "6", "C", "C", "6", "0"],
                ["6", "C", "C", "C", "C", "6"],
                ["6", "C", "C", "C", "C", "6"],
                ["0", "6", "C", "C", "6", "0"],
                ["0", "0", "6", "6", "0", "0"],
            ], [
                ["0", "0", "C", "C", "0", "0"],
                ["0", "C", "C", "C", "C", "0"],
                ["C", "C", "C", "C", "C", "C"],
                ["C", "C", "C", "C", "C", "C"],
                ["0", "C", "C", "C", "C", "0"],
                ["0", "0", "C", "C", "0", "0"],
            ]
        ],
        offSets: [],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
