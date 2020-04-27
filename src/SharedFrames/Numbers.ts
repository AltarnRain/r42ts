/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frames } from "../Types/Types";
import { convertVariableFramesColor } from "../Utility/Frame";

/**
 * Module:          Numbers
 * Responsibility:  Numbers 0 to 9. All colors are variant and can be set with single function call.
 */

export default function getNumbers(color: string): Frames {
    const numbers: Frames = [
        [
            ["0", "V", "V", "0"],
            ["V", "0", "0", "V"],
            ["V", "0", "0", "V"],
            ["V", "0", "0", "V"],
            ["0", "V", "V", "0"],
        ],
        [
            ["0", "0", "V", "0"],
            ["0", "V", "V", "0"],
            ["0", "0", "V", "0"],
            ["0", "0", "V", "0"],
            ["V", "V", "V", "V"],
        ],
        [
            ["0", "V", "V", "0"],
            ["V", "0", "0", "V"],
            ["0", "0", "V", "0"],
            ["0", "V", "0", "0"],
            ["V", "V", "V", "V"],

        ],
        [
            ["0", "V", "V", "0"],
            ["V", "0", "0", "V"],
            ["0", "0", "V", "0"],
            ["V", "0", "0", "V"],
            ["0", "V", "V", "0"],
        ],
        [
            ["V", "0", "0", "0"],
            ["V", "0", "V", "0"],
            ["V", "V", "V", "V"],
            ["0", "0", "V", "0"],
            ["0", "0", "V", "0"],

        ],
        [
            ["V", "V", "V", "V"],
            ["V", "0", "0", "0"],
            ["V", "V", "V", "0"],
            ["0", "0", "0", "V"],
            ["V", "V", "V", "0"],
        ],
        [
            ["0", "V", "V", "V"],
            ["V", "0", "0", "0"],
            ["V", "V", "V", "0"],
            ["V", "0", "0", "V"],
            ["0", "V", "V", "0"],

        ],
        [
            ["V", "V", "V", "V"],
            ["0", "0", "0", "V"],
            ["0", "0", "V", "0"],
            ["0", "V", "0", "0"],
            ["V", "0", "0", "0"],
        ],
        [
            ["0", "V", "V", "0"],
            ["V", "0", "0", "V"],
            ["0", "V", "V", "0"],
            ["V", "0", "0", "V"],
            ["0", "V", "V", "0"],
        ],
        [
            ["0", "V", "V", "0"],
            ["V", "0", "0", "V"],
            ["0", "V", "V", "V"],
            ["0", "0", "0", "V"],
            ["V", "V", "V", "0"],
        ],
    ];

    convertVariableFramesColor(numbers, color);
    return numbers;
}