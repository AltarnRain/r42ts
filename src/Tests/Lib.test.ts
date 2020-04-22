/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Lib.test
 * Responsibility:  Tests the lib functions.
 */

import "jest";
import { Frames } from "../Types/Types";
import * as Lib from "../Utility/Lib";

test("clone frames", () => {
    const original: Frames = [
        [
            ["a"],
            ["x"],
        ],
        [
            ["1", "3"],
            ["2", "4"],
        ]
    ];

    // Act
    const clonedFrames = Lib.cloneObject(original);

    // Assert

    expect(clonedFrames[0]).toBeDefined();
    expect(clonedFrames[1]).toBeDefined();
    expect(clonedFrames[0][0].length).toBe(1);
    expect(clonedFrames[1][0].length).toBe(2);

    expect(original[0][0][0]).toBe("a");
    expect(original[0][1][0]).toBe("x");
    expect(original[1][0][0]).toBe("1");
    expect(original[1][1][0]).toBe("2");
});

test("cloneObject", () => {
    const original: Frames = [
        [
            ["V"],
            ["V"],
        ],
        [
            ["V", "V"],
            ["V", "V"],
        ]
    ];

    const clonedFrames = Lib.cloneObject(original);

    const f0 = clonedFrames[0][0].length;

    expect(f0).toBe(1);
});