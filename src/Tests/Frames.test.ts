/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Frames.test
 * Responsibility:  Test the Frame utility class.
 */

import CGAColors from "../Constants/CGAColors";
import { Frame as FrameType, Frames } from "../Types/Types";
import * as Frame from "../Utility/Frame";

const frames: Frames = [
    [["a"]],
    [["b"]],
];

test("getFrameDimensions", () => {
    // Arrange
    const f: FrameType = [
        ["0", "0"],
        ["0", "0"],
        ["0", "0"],
    ];

    // Act
    const result = Frame.getFrameDimensions(f, 10);

    // Assert
    expect(result.height).toBe(30);
    expect(result.width).toBe(20);
});

test("getFrameCenter", () => {

    // Act
    const result = Frame.getFrameCenter(0, 0, frames[0], 5);

    // Assert
    expect(result).toBeDefined();
    expect(result.left).toBeGreaterThan(0);
    expect(result.top).toBeGreaterThan(0);
});

test("getRandomFramesKeyIndex single key", () => {

    const f: Frames = [
        [[]],
    ];

    // Act
    const index = Frame.getRandomFrameKeyIndex(f);

    // Assert
    expect(index).toBe(0);
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

test("getFrameByIndex", () => {
    // Act
    const result1 = Frame.getFrameByIndex(frames, 0);
    expect(result1).toBeDefined();
    expect(result1[0][0]).toBe("a");
    expect(() => Frame.getFrameByIndex(frames, 3)).toThrow();
});

test("getFrameHitbox", () => {
    // Act
    const result = Frame.getFrameHitbox(
        0,
        0,
        50,
        100,
        10,
        20,
    );

    // Assert
    expect(result.top).toBe(10);
    expect(result.left).toBe(0);
    expect(result.right).toBe(50);
    expect(result.bottom).toBe(120);
});
