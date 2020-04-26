/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          FrameProvider.tests
 * Responsibility:  Test the frame provider.
 */

import "jest";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import { Frames } from "../Types/Types";

const Frames: Frames = [
    [["a"]],
    [["b"]],
    [["c"]],
];

test("Test if the provided frames go back and forth", () => {
    // Arrange
    const fp = new BackAndForthFrameProvider(0);
    fp.setFrames(Frames);
    // Act
    const a1 = fp.getCurrentFrameCopy();
    const b1 = fp.getNextFrameClone();
    const c1 = fp.getNextFrameClone();
    const b2 = fp.getNextFrameClone();
    const a2 = fp.getNextFrameClone();
    const b3 = fp.getNextFrameClone();
    const c3 = fp.getNextFrameClone();

    // Assert
    expect(a1[0][0]).toBe("a");
    expect(b1[0][0]).toBe("b");
    expect(c1[0][0]).toBe("c");
    expect(b2[0][0]).toBe("b");
    expect(a2[0][0]).toBe("a");
    expect(b3[0][0]).toBe("b");
    expect(c3[0][0]).toBe("c");
});