/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frames } from "../Types/Types";

/**
 * Module:          Numbers
 * Responsibility:  A raster collection that contains all characters used in the game. The characters are stored in a 2d array. A "V" is a pixel, a "0" is not.
 * No color information is stored here. Color is determined by the game.
 */

const Numbers: Frames = {
    F0: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    F1: [
        ["0", "0", "V", "0"],
        ["0", "V", "V", "0"],
        ["0", "0", "V", "0"],
        ["0", "0", "V", "0"],
        ["V", "V", "V", "V"],
    ],
    F2: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "0", "V", "0"],
        ["0", "V", "0", "0"],
        ["V", "V", "V", "V"],

    ],
    F3: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "0", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    F4: [
        ["V", "0", "0", "0"],
        ["V", "0", "V", "0"],
        ["V", "V", "V", "V"],
        ["0", "0", "V", "0"],
        ["0", "0", "V", "0"],

    ],
    F5: [
        ["V", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "0"],
        ["0", "0", "0", "V"],
        ["V", "V", "V", "0"],
    ],
    F6: [
        ["0", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],

    ],
    F7: [
        ["V", "V", "V", "V"],
        ["0", "0", "0", "V"],
        ["0", "0", "V", "0"],
        ["0", "V", "0", "0"],
        ["V", "0", "0", "0"],
    ],
    F8: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    F9: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "V"],
        ["0", "0", "0", "V"],
        ["V", "V", "V", "0"],
    ],
};

export default Numbers;