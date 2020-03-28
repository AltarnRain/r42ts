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
import { getRandomArrayElement, getRandomFrameKeyIndex } from "../Utility/Lib";

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
