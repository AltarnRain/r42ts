/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetBoatOffsetFrames
 * Responsibility:  Define the frames of the Boat enemy.
 */

export default function getBoatOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["E", "0", "C", "C", "C", "C", "0", "0"],
                ["0", "E", "0", "0", "A", "A", "A", "0"],
                ["E", "0", "0", "0", "0", "0", "0", "A"],
                ["0", "E", "0", "0", "A", "A", "A", "0"],
                ["E", "0", "C", "C", "C", "C", "0", "0"],
            ],
            [
                ["0", "E", "C", "C", "C", "C", "0", "0"],
                ["E", "0", "0", "0", "A", "A", "A", "0"],
                ["0", "E", "0", "0", "0", "0", "0", "A"],
                ["E", "0", "0", "0", "A", "A", "A", "0"],
                ["0", "E", "C", "C", "C", "C", "0", "0"],
            ]

        ],
        offSets: [
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
            {
                left: 0,
                top: -4,
            },
            {
                left: 0,
                top: -2
            },
            {
                left: 0,
                top: 0g
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.frames = [
        ...resource.frames,
        ...resource.frames,
        ...resource.frames,
    ];

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);
    return resource;
}
