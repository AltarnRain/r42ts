/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          OrbFrames
 * Responsibility:  Define the frames for the orb enemy
 */

import { OffsetFrames } from "../../Models/OffsetFrames";

const orbFrames: OffsetFrames = {
    frames: [
        [
            ["0", "1", "1", "0"],
            ["1", "2", "2", "1"],
            ["1", "2", "2", "1"],
            ["0", "1", "1", "0"],
        ]
    ],
    offSets: [
        { // left
            left: 0,
            top: 0,
        },
        { // top
            left: 1,
            top: -1,
        },
        { // right
            left: 2,
            top: 0,
        },
        { // bottom
            left: 1,
            top: 1,
        },
    ],
};

// Duplicate the first frame 3 times for a total of 4.
orbFrames.frames = [
    ...orbFrames.frames,
    orbFrames.frames[0],
    orbFrames.frames[0],
    orbFrames.frames[0],
];

export default function getOrbFrames(): OffsetFrames {
    return JSON.parse(JSON.stringify(orbFrames));
}