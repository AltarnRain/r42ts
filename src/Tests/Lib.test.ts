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
import Frames from "../Types/Frames";
import { cloneFrames, getRandomArrayElement, getRandomFrameKeyIndex, padLeft, setVariableFrameColors } from "../Utility/Lib";
import CGAColors from "../Constants/CGAColors";

test("getRandomArrayElement", () => {
    const arr = ["a"];

    const result = getRandomArrayElement(arr);

    expect(result).toBe("a");
});

test("getRandomFramesKeyIndex single key", () => {

    // Arrange
    const frames: Frames = {
        F0: [],
    };

    // Act
    const index = getRandomFrameKeyIndex(frames);

    // Assert
    expect(index).toBe(0);
});

test("getRandomFramesKeyIndex multiple keys", () => {

    // Arrange
    const frames: Frames = {
        F0: [],
        F1: [],
        F2: [],
    };

    const indexes: number[] = [];

    // Act
    for (let i = 0; i < 100; i++) {
        indexes.push(getRandomFrameKeyIndex(frames));
    }

    // Assert
    expect(indexes.every((i) => i >= 0)).toBe(true);
    expect(indexes.every((i) => i <= 2)).toBe(true);
});

test("pad left", () => {
    // Act
    const result1 = padLeft("1", 6, "0");
    const result2 = padLeft("12", 6, "0");
    const result3 = padLeft("123", 6, "0");
    const result4 = padLeft("1234", 6, "0");
    const result5 = padLeft("12345", 6, "0");
    const result6 = padLeft("123456", 6, "0");
    const result7 = padLeft("1234567", 6, "0");
    const result8 = padLeft("", 6, "0");

    // Assert
    expect(result1).toBe("000001");
    expect(result2).toBe("000012");
    expect(result3).toBe("000123");
    expect(result4).toBe("001234");
    expect(result5).toBe("012345");
    expect(result6).toBe("123456");
    expect(result7).toBe("1234567");
    expect(result8).toBe("000000");
});

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
    const clonedFrames = cloneFrames(original);

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

test("setVariableFrameColors", () => {
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

    const clonedFrames = cloneFrames(original);

    const f0 = clonedFrames.F0[0].length;

    expect(f0).toBe(1);
});
