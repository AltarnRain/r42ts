/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { OffsetFrames } from "../../Models/OffsetFrames";
import { getMaximumFrameDimensions } from "../../Utility/Frame";

/**
 * Module:          GetPistonOffsetFrames
 * Responsibility:  Define the offset frames of the Piston enemy.
 */

export default function getPistonOffsetFrames(): OffsetFrames {
    const resource = {
        frames: [
            [
                ["3", "3", "3"],
                ["C", "3", "C"],
                ["C", "C", "C"],
                ["C", "3", "C"],
                ["0", "3", "0"],
            ],
            [
                ["3", "3", "3"],
                ["C", "3", "C"],
                ["C", "C", "C"],
                ["C", "3", "C"],
                ["0", "3", "0"],
            ],
            [
                ["3", "3", "3"],
                ["C", "3", "C"],
                ["C", "C", "C"],
                ["C", "3", "C"],
                ["0", "3", "0"],
            ],
            [
                ["3", "3", "3"],
                ["0", "3", "0"],
                ["C", "3", "C"],
                ["C", "C", "C"],
                ["C", "3", "C"],
            ],
            [
                ["3", "3", "3"],
                ["0", "3", "0"],
                ["0", "3", "0"],
                ["C", "3", "C"],
                ["C", "C", "C"],
                ["C", "0", "C"],
            ],

        ],
        offSets: [
            {
                left: 0,
                top: 0
            },
            {
                left: 0,
                top: 0
            },
            {
                left: 0,
                top: 0
            },
            {
                left: 0,
                top: -1,
            },
            {
                left: 0,
                top: -2,
            }
        ],
        maxSizes: { width: 0, height: 0 }
    };

    resource.maxSizes = getMaximumFrameDimensions(resource.frames);

    return resource;
}
