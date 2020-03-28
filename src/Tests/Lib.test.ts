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
import { getRandomArrayElement, getRandomFrameKeyIndex, padLeft } from "../Utility/Lib";

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
