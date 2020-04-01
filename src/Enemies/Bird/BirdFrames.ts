/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Bird enemy
 * Responsibility:  Define animation frames for the bird enemy.
 */

import { Frames } from "../../Types/Types";

const BirdFrames: Frames = {
    F0: [
        ["0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "V", "0", "V", "0", "0"],
        ["0", "V", "0", "V", "0", "V", "0"],
        ["0", "V", "0", "0", "0", "V", "0"],
    ],
    F1: [
        ["0", "0", "0", "0", "0", "0", "0"],
        ["0", "V", "V", "0", "V", "V", "0"],
        ["V", "0", "0", "V", "0", "0", "V"],
        ["0", "0", "0", "0", "0", "0", "0"],
    ],
    F2: [
        ["0", "0", "0", "0", "0", "0", "0"],
        ["V", "V", "V", "0", "V", "V", "V"],
        ["0", "0", "0", "V", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0"],
    ],
    F3: [
        ["V", "0", "0", "0", "0", "0", "V"],
        ["0", "V", "V", "0", "V", "V", "0"],
        ["0", "0", "0", "V", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0"],
    ]
};

export default BirdFrames;
