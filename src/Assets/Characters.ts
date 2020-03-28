/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Frames from "../Types/Frames";

/**
 * Module:          Numbers
 * Responsibility:  A raster collection that contains all characters used in the game. The characters are stored in a 2d array. A "V" is a pixel, a "0" is not.
 * No color information is stored here. Color is determined by the game.
 */

const Characters: Frames = {
    N0: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    N1: [
        ["0", "0", "V", "0"],
        ["0", "V", "V", "0"],
        ["0", "0", "V", "0"],
        ["0", "0", "V", "0"],
        ["V", "V", "V", "V"],
    ],
    N2: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "0", "V", "0"],
        ["0", "V", "0", "0"],
        ["V", "V", "V", "V"],

    ],
    N3: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "0", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    N4: [
        ["V", "0", "0", "0"],
        ["V", "0", "V", "0"],
        ["V", "V", "V", "V"],
        ["0", "0", "V", "0"],
        ["0", "0", "V", "0"],

    ],
    N5: [
        ["V", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "0"],
        ["0", "0", "0", "V"],
        ["V", "V", "V", "0"],
    ],
    N6: [
        ["0", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],

    ],
    N7: [
        ["V", "V", "V", "V"],
        ["0", "0", "0", "V"],
        ["0", "0", "V", "0"],
        ["0", "V", "0", "0"],
        ["V", "0", "0", "0"],
    ],
    N8: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    N9: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "V"],
        ["0", "0", "0", "V"],
        ["V", "V", "V", "0"],
    ],
    SPACE: [
        ["0"],
        ["0"],
        ["0"],
        ["0"],
        ["0"],
    ],
    A: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "V", "V", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
    ],
    B: [
        ["V", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "V", "V", "V"],
        ["V", "0", "0", "V"],
        ["V", "V", "V", "0"],
    ],
    C: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "0"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    D: [
        ["V", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "V", "V", "0"],
    ],
    E: [
        ["V", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "0"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "V"],
    ],
    F: [
        ["V", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "0"],
        ["V", "0", "0", "0"],
        ["V", "0", "0", "0"],
    ],
    G: [
        ["0", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["V", "0", "V", "V"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "V"],
    ],
    H: [
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "V", "V", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
    ],
    I: [
        ["V", "V", "V"],
        ["0", "V", "0"],
        ["0", "V", "0"],
        ["0", "V", "0"],
        ["V", "V", "V"],
    ],
    J: [
        ["V", "V", "V", "V"],
        ["0", "0", "0", "V"],
        ["0", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    K: [
        ["V", "0", "0", "V"],
        ["V", "0", "V", "0"],
        ["V", "V", "0", "0"],
        ["V", "0", "V", "0"],
        ["V", "0", "0", "V"],
    ],
    L: [
        ["V", "0", "0", "0"],
        ["V", "0", "0", "0"],
        ["V", "0", "0", "0"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "V"],
    ],
    M: [
        ["V", "0", "0", "0", "V"],
        ["V", "V", "0", "V", "V"],
        ["V", "0", "V", "0", "V"],
        ["V", "0", "0", "0", "V"],
        ["V", "0", "0", "0", "V"],
    ],
    N: [
        ["V", "0", "0", "V"],
        ["V", "V", "0", "V"],
        ["V", "0", "V", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
    ],
    O: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    P: [
        ["V", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "V", "V", "0"],
        ["V", "0", "0", "0"],
        ["V", "0", "0", "0"],
    ],
    Q: [
        ["0", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "V", "V"],
        ["0", "V", "V", "V"],
    ],
    R: [
        ["V", "V", "V", "0"],
        ["V", "0", "0", "V"],
        ["V", "V", "V", "0"],
        ["V", "0", "V", "0"],
        ["V", "0", "0", "V"],
    ],
    S: [
        ["0", "V", "V", "V"],
        ["V", "0", "0", "0"],
        ["0", "V", "V", "0"],
        ["0", "0", "0", "V"],
        ["V", "V", "V", "0"],
    ],
    T: [
        ["V", "V", "V", "V", "V"],
        ["0", "0", "V", "0", "0"],
        ["0", "0", "V", "0", "0"],
        ["0", "0", "V", "0", "0"],
        ["0", "0", "V", "0", "0"],
    ],
    U: [
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["V", "0", "0", "V"],
        ["0", "V", "V", "0"],
    ],
    V: [
        ["V", "0", "0", "0", "V"],
        ["V", "0", "0", "0", "V"],
        ["0", "V", "0", "V", "0"],
        ["0", "V", "0", "V", "0"],
        ["0", "0", "V", "0", "0"],
    ],
    W: [
        ["V", "0", "0", "0", "V"],
        ["V", "0", "0", "0", "V"],
        ["V", "0", "V", "0", "V"],
        ["0", "V", "V", "V", "0"],
        ["0", "V", "0", "V", "0"],
    ],
    X: [
        ["V", "0", "0", "0", "V"],
        ["0", "V", "0", "V", "0"],
        ["0", "0", "V", "0", "0"],
        ["0", "V", "0", "V", "0"],
        ["V", "0", "0", "0", "V"],
    ],
    Y: [
        ["V", "0", "0", "0", "V"],
        ["0", "V", "0", "V", "0"],
        ["0", "0", "V", "0", "0"],
        ["0", "0", "V", "0", "0"],
        ["0", "0", "V", "0", "0"],
    ],
    Z: [
        ["V", "V", "V", "V"],
        ["0", "0", "V", "0"],
        ["0", "V", "0", "0"],
        ["V", "0", "0", "0"],
        ["V", "V", "V", "V"],
    ],
};

export default Characters;

/**
 * Returns an object with all the number frames.
 */
export function getNumberFrames(): Frames {
    return {
        N0: Characters.N0,
        N1: Characters.N1,
        N2: Characters.N2,
        N3: Characters.N3,
        N4: Characters.N4,
        N5: Characters.N5,
        N6: Characters.N6,
        N7: Characters.N7,
        N8: Characters.N8,
        N9: Characters.N9
    };
}