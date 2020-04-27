/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";

/**
 * Module:          OrbFrames
 * Responsibility:  Define the frames for the orb enemy
 */

export default function getOrbFrames(): OffsetFrames {

    const orbMainFrame = [
        ["0", "V0", "V0", "0"],
        ["V0", "V1", "V1", "V0"],
        ["V0", "V1", "V1", "V0"],
        ["0", "V0", "V0", "0"],
    ];

    const orbFrames: OffsetFrames = {
        frames: [],
        offSets: [
            // Move up
            {
                left: 0,
                top: 0,
            },
            {
                left: 0,
                top: -2,
            },
            {
                left: 0,
                top: -4,
            },
            {
                left: 0,
                top: -6,
            },
            // Move right
            {
                left: 2,
                top: -6,
            },
            {
                left: 4,
                top: -6,
            },
            {
                left: 6,
                top: -6,
            },
            // Move down
            {
                left: 6,
                top: -4,
            },
            {
                left: 6,
                top: -2,
            },
            {
                left: 6,
                top: 0,
            },
            // Move left
            {
                left: 4,
                top: 0,
            },
            {
                left: 2,
                top: 0,
            }
        ],
    };

    orbFrames.offSets.forEach(() => {
        orbFrames.frames.push(orbMainFrame);
    });

    return orbFrames;
}