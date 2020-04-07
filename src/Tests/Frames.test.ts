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

const frames: Frames = {
    F0: [["a"]],
    F1: [["b"]],
};

test("setRandomFrameColors", () => {
    // Arrange
    const variableFrame: Frames = {
        F0: [["V"]]
    };

    // Act
    Frame.setRandomFrameColors(variableFrame, ["test"]);

    // Assert
    expect(variableFrame.F0[0][0]).toBe("test");
});

test("convertFrameColor", () => {
    // Arrange
    const f: FrameType = [["E"]];

    // Act
    Frame.convertFrameColor(f);

    // Assert
    expect(f[0][0]).toBe(CGAColors.yellow);
});

test("getRandomFramesKeyIndex single key", () => {

    const f: Frames = {
        F: [[]],
    };

    // Act
    const index = Frame.getRandomFrameKeyIndex(f);

    // Assert
    expect(index).toBe(0);
});

test("getFrameByIndex", () => {
    // Act
    const result1 = Frame.getFrameByIndex(frames, 0);
    expect(result1).toBeDefined();
    expect(result1[0][0]).toBe("a");
    expect(() => Frame.getFrameByIndex(frames, 3)).toThrow();
});

test("getFrameCenter", () => {

    // Act
    const result = Frame.getFrameCenter({ top: 0, left: 0 }, frames.F0, 5);

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