/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame, Frames } from "../Types/Types";
import { convertFramesColors } from "../Utility/Frame";

/**
 * Module:          PlayerFrames
 * Responsibility:  Contains player related frames
 */

const playerFrame: Frame = [
    ["0", "0", "B", "B", "0", "0"],
    ["A", "B", "F", "F", "B", "A"],
    ["B", "F", "0", "0", "F", "B"],
];

const playerFormationFrames: Frames = [
    [["B", "B"]],  // nozzle tip
    [["F", "F"]],  // nozle bottom
    [              // left wing
        ["A", "B"],
        ["B", "F"],
    ],
    [              // right wing
        ["B", "A"],
        ["F", "B"]
    ],
];

export function getPlayerFrame(): Frame {
    return JSON.parse(JSON.stringify(playerFrame));
}

export function getPlayerFormationFrames(): Frames {
    const f = JSON.parse(JSON.stringify(playerFormationFrames));
    convertFramesColors(f);
    return f;
}