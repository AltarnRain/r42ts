/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetCloakingOrbOffsetFrames
 * Responsibility:  Define the frames for the Cloakingorb enemy
 */

export default function getCloakingOrbOffsetFrames(): OffsetFrames {

    const resource: OffsetFrames = {
        frames: [
            [
                ["0", "V", "V", "0"],
                ["V", "V", "V", "V"],
                ["V", "V", "V", "V"],
                ["0", "V", "V", "0"],
            ],
            [
                ["0", "V", "V"],
                ["V", "0", "V"],
                ["0", "V", "V"],
                ["0", "V", "V"],
            ],
            [
                ["V", "0"],
                ["0", "V"],
                ["V", "0"],
                ["0", "V"],
            ],
            [
                ["0", "V"],
                ["V", "0"],
            ],
            [
                ["0"],
            ]
        ],
        offSets: [
            { left: 0, top: 0 },
            { left: 0, top: 0 },
            { left: 1, top: 0 },
            { left: 1, top: 0 },
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}