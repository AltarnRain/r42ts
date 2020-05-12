/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          RobotFrames
 * Responsibility:  Define the frames of the RobotEnemy
 */

export default function getRobotFrames(): OffsetFrames {

    let offsetCount = 0;
    const resource: OffsetFrames = {
        frames: [
            [
                ["0", "V", "V", "V", "0"],
                ["V", "V", "V", "V", "V"],
                ["V", "0", "V", "0", "V"],
                ["V", "V", "V", "V", "V"],
                ["V", "0", "0", "0", "V"],
                ["V", "V", "V", "V", "V"],
                ["0", "V", "0", "V", "0"],
                ["0", "V", "0", "V", "0"],
                ["V", "V", "0", "V", "V"],
            ],
            [
                ["0", "V", "V", "V", "0"],
                ["V", "V", "V", "V", "V"],
                ["V", "0", "V", "0", "V"],
                ["V", "V", "V", "V", "V"],
                ["V", "0", "0", "0", "V"],
                ["V", "V", "V", "V", "V"],
                ["0", "V", "0", "V", "0"],
                ["V", "V", "0", "V", "V"],
            ],
            [
                ["0", "V", "V", "V", "0"],
                ["V", "V", "V", "V", "V"],
                ["V", "0", "V", "0", "V"],
                ["V", "V", "V", "V", "V"],
                ["V", "0", "0", "0", "V"],
                ["V", "V", "V", "V", "V"],
                ["V", "V", "0", "V", "V"],
            ],
        ],
        offSets: [
            {
                top: offsetCount,
                left: 0,
            },
            {
                top: offsetCount,
                left: 0,
            },
            {
                top: offsetCount,
                left: 0,
            },
            {
                top: ++offsetCount,
                left: 0,
            },
            {
                top: ++offsetCount,
                left: 0,
            },
            {
                top: offsetCount += 1,
                left: 0,
            },
            {
                top: offsetCount += 1,
                left: 0,
            },
            {
                top: offsetCount += 2,
                left: 0
            },
            {
                top: offsetCount += 1,
                left: 0
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    // Add frame 0 an additional 7 times to make the animation look good.
    resource.frames = [
        resource.frames[0],
        resource.frames[0],
        resource.frames[0],
        resource.frames[0],
        resource.frames[0],
        resource.frames[0],
        ...resource.frames,
    ];

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}