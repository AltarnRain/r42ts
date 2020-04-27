/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RobotFrames
 * Responsibility:  Define the frames of the RobotEnemy
 */

import { OffsetFrames } from "../../Models/OffsetFrames";

export default function getRobotFrames(): OffsetFrames {

    let offsetCount = 0;
    const robotFrames: OffsetFrames = {
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
                left: 0
            },
            {
                top: ++offsetCount,
                left: 0
            }
        ]
    };

    // Add frame 0 an additional 7 times to make the animation look good.
    robotFrames.frames = [
        robotFrames.frames[0],
        robotFrames.frames[0],
        robotFrames.frames[0],
        robotFrames.frames[0],
        robotFrames.frames[0],
        robotFrames.frames[0],
        ...robotFrames.frames,
    ];

    return robotFrames;
}