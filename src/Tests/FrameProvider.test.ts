/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          FrameProvider.tests
 * Responsibility:  Test the frame provider.
 */

import "jest";
import Dictionary from "../Models/Dictionary";
import FrameProvider from "../Providers/FrameProvider";

const Frames: Dictionary<string[][]> = {
    F0: [["a"]],
    F1: [["b"]],
    F2: [["c"]],
};

test("Test if the provided frames go back and forth", () => {
    // Arrange
    const fp = new FrameProvider(Frames, 0);

    // Act
    const a1 = fp.getFrame();
    const b1 = fp.getFrame();
    const c1 = fp.getFrame();
    const b2 = fp.getFrame();
    const a2 = fp.getFrame();
    const b3 = fp.getFrame();
    const c3 = fp.getFrame();

    // Assert
    expect(a1[0][0]).toBe("a");
    expect(b1[0][0]).toBe("b");
    expect(c1[0][0]).toBe("c");
    expect(b2[0][0]).toBe("b");
    expect(a2[0][0]).toBe("a");
    expect(b3[0][0]).toBe("b");
    expect(c3[0][0]).toBe("c");
});