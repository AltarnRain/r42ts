/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frames } from "../Types/Types";
import * as Frame from "../Utility/Frame";

/**
 * Module:          Frames.test
 * Responsibility:  Test the Frame utility class.
 */

// Arrange
// Arrange
const frames: Frames = {
    F0: [["a"]],
    F1: [["b"]],
};

test("getRandomFramesKeyIndex single key", () => {
    // Act
    const index = Frame.getRandomFrameKeyIndex(frames);

    // Assert
    expect(index).toBe(0);
});

test("getFrameByIndex", () => {
    // Act
    const result1 = Frame.getFrameByIndex(frames, 0);
    const result2 = Frame.getFrameByIndex(frames, 3);

    expect(result1).toBeDefined();
    expect(result1[0][0]).toBe("a");
    expect(result2).toBeUndefined();
});

test("getFrameCenter", () => {

    // Act
    const result = Frame.getFrameCenter({top: 0, left: 0}, frames.F0, 5);

    // Assert
    expect(result).toBeDefined();
    expect(result.left).toBeGreaterThan(0);
    expect(result.top).toBeGreaterThan(0);
});

test("getRandomFramesKeyIndex multiple keys", () => {

    const indexes: number[] = [];

    // Act
    for (let i = 0; i < 100; i++) {
        indexes.push(Frame.getRandomFrameKeyIndex(frames));
    }

    // Assert
    expect(indexes.every((i) => i >= 0)).toBe(true);
    expect(indexes.every((i) => i <= 2)).toBe(true);
});