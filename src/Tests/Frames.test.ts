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

test("convertRandomFrameColors", () => {
    // Arrange
    const variableFrame: Frames = [
        [["V"]]
    ];

    // Act
    Frame.setRandomFrameColors(variableFrame, ["test"]);

    // Assert
    expect(variableFrame[0][0][0]).toBe("test");
});

test("converFramesColor", () => {
    // Arrange
    const f: Frames = [[["E"]]];

    // Act
    Frame.convertFramesColors(f);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.yellow);
});

test("convertFrameColor", () => {
    // Arrange
    const f: FrameType = [["E"]];

    // Act
    Frame.convertFrameColor(f);

    // Assert
    expect(f[0][0]).toBe(CGAColors.yellow);
});

test("convertVariableFramesColor", () => {
    // Arrange
    const f: Frames = [
        [["V"]]
    ];

    // Act
    Frame.convertVariableFramesColor(f, CGAColors.green);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.green);
});

test("convertVariableFrameColor", () => {
    // Arrange
    const f: FrameType = [["V"]];

    // Act
    Frame.convertVariableFrameColor(f, CGAColors.lightBlue);

    // Assert
    expect(f[0][0]).toBe(CGAColors.lightBlue);
});

test("setFramesColor", () => {
    // Arrange
    const f: Frames = [
        [["NotAColor"]]
    ];

    // Act
    Frame.setFramesColor(f, CGAColors.lightRed);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.lightRed);
});

test("setFrameColor", () => {
    // Arrange
    const f: FrameType = [["NotAColor"]];

    // Act
    Frame.setFrameColor(f, CGAColors.lightCyan);

    // Assert
    expect(f[0][0]).toBe(CGAColors.lightCyan);
});

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
    const result = Frame.getFrameCenter({ top: 0, left: 0 }, frames[0], 5);

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
        {
            left: 0,
            top: 0,
        },
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
