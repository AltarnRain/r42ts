/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import Frame from "../../Types/Frame";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetCloakingOrbOffsetFrames
 * Responsibility:  Define the frames for the Cloakingorb enemy
 */

export default function getCloakingOrbOffsetFrames(): OffsetFrames {

    const uniqueFrames: Frame[] = [
        [ // Fully visible frame. Added two times for a total of three. This ensures the orb is visible for ~0.5 second.
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
            ["0"], // Invisible frame 1. Does not have a hitbox.
        ],
        [
            ["0"] // Invisible frame 2. Also does not have a hitbox.
        ]
    ];

    const resource: OffsetFrames = {
        frames: [],
        offSets: [
            { left: 0, top: 0 },
            { left: 0, top: 0 },
            { left: 0, top: 0 },
            { left: 0, top: 0 },
            { left: 1, top: 0 },
            { left: 1, top: 1 },
        ],
        maxSizes: { width: 0, height: 0 }
    };

    // We'll add frame 0 3 times to lenghen the amount of time the cloaking orb is in its visible state.
    resource.frames.push(uniqueFrames[0]); // 1
    resource.frames.push(uniqueFrames[0]); // 2
    uniqueFrames.forEach((f) => resource.frames.push(f)); // 3 + rest.

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}