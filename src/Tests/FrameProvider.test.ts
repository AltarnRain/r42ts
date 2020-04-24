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
import FrameProvider from "../Providers/FrameProvider";
import { Frames } from "../Types/Types";

const Frames: Frames = [
    [["a"]],
    [["b"]],
    [["c"]],
];

test("Test if the provided frames go back and forth", () => {
    // Arrange
    const fp = new FrameProvider(Frames, 0);

    // Act
    const a1 = fp.getCurrentFrame();
    const b1 = fp.getBackAndForthNextFrame();
    const c1 = fp.getBackAndForthNextFrame();
    const b2 = fp.getBackAndForthNextFrame();
    const a2 = fp.getBackAndForthNextFrame();
    const b3 = fp.getBackAndForthNextFrame();
    const c3 = fp.getBackAndForthNextFrame();

    // Assert
    expect(a1[0][0]).toBe("a");
    expect(b1[0][0]).toBe("b");
    expect(c1[0][0]).toBe("c");
    expect(b2[0][0]).toBe("b");
    expect(a2[0][0]).toBe("a");
    expect(b3[0][0]).toBe("b");
    expect(c3[0][0]).toBe("c");
});