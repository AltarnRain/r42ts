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

let offsetCount = 0;

export const RobotFrames: OffsetFrames = {
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

export default RobotFrames;