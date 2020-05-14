/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetBatOffsetFrames
 * Responsibility:  Define the frames of the Bats enemy.
 */

export default function getBatOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["V", "0", "0", "0", "0", "0", "V"],
                ["0", "V", "0", "0", "0", "V", "0"],
                ["0", "0", "V", "V", "V", "0", "0"],
            ],
            [
                ["0", "0", "V", "V", "V", "0", "0"],
                ["0", "V", "0", "0", "0", "V", "0"],
                ["V", "0", "0", "0", "0", "0", "V"],
            ],
        ],
        offSets: [
            {
                top: -2,
                left: 0
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
