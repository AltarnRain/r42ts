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
    const original: Frames = {
        F0: [
            ["a"],
            ["x"],
        ],
        F1: [
            ["1", "3"],
            ["2", "4"],
        ]
    };

    // Act
    const clonedFrames = Lib.cloneObject(original);

    // Assert

    expect(clonedFrames.F0).toBeDefined();
    expect(clonedFrames.F1).toBeDefined();
    expect(clonedFrames.F0[0].length).toBe(1);
    expect(clonedFrames.F1[0].length).toBe(2);

    expect(original.F0[0][0]).toBe("a");
    expect(original.F0[1][0]).toBe("x");
    expect(original.F1[0][0]).toBe("1");
    expect(original.F1[1][0]).toBe("2");
});

test("cloneObject", () => {
    const original: Frames = {
        F0: [
            ["V"],
            ["V"],
        ],
        F1: [
            ["V", "V"],
            ["V", "V"],
        ]
    };

    const clonedFrames = Lib.cloneObject(original);

    const f0 = clonedFrames.F0[0].length;

    expect(f0).toBe(1);
});