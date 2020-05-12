/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          Bird enemy
 * Responsibility:  Define animation frames for the bird enemy.
 */

export default function getBirdFrames(): OffsetFrames {
    const resource: OffsetFrames = {
        frames: [
            [
                ["0", "V", "0", "V", "0"],
                ["V", "0", "V", "0", "V"],
                ["V", "0", "0", "0", "V"],
            ],
            [
                ["0", "V", "V", "0", "V", "V", "0"],
                ["V", "0", "0", "V", "0", "0", "V"],
                ["0", "0", "0", "0", "0", "0", "0"],
            ],
            [
                ["V", "V", "V", "0", "V", "V", "V"],
                ["0", "0", "0", "V", "0", "0", "0"],
            ],
            [
                ["V", "0", "0", "0", "0", "0", "V"],
                ["0", "V", "V", "0", "V", "V", "0"],
                ["0", "0", "0", "V", "0", "0", "0"],
            ],
        ],
        offSets: [
            {
                top: 1,
                left: 1,
            },
            {
                top: 1,
                left: 0,
            },
            {
                top: 1,
                left: 0,
            },
            {
                top: 0,
                left: 0,
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}