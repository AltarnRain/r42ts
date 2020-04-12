/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame, Frames } from "../Types/Types";

/**
 * Module:          PlayerFrames
 * Responsibility:  Contains player related frames
 */

export const PlayerFrame: Frame = [
    ["0", "0", "B", "B", "0", "0"],
    ["A", "B", "F", "F", "B", "A"],
    ["B", "F", "0", "0", "F", "B"],
];

export const PlayerFormationFrames: Frames = {
    F0: [["B", "B"]],  // nozzle tip
    F1: [["F", "F"]],  // nozle bottom
    F2: [              // left wing
        ["A", "B"],
        ["B", "F"],
    ],
    F3: [              // right wing
        ["B", "A"],
        ["F", "B"]
    ],
};
