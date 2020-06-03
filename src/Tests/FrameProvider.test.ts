/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import "jest";
import BackAndForthFrameProvider from "../FrameProviders/BackAndForthFrameProvider";
import { Frame } from "../Types/Frame";

/**
 * Module:          FrameProvider.tests
 * Responsibility:  Test the frame provider.
 */

const Frames: Frame[] = [
    [["a"]],
    [["b"]],
    [["c"]],
];

test("Test if the provided frames go back and forth", () => {
    // Arrange
    const fp = new BackAndForthFrameProvider(0);
    fp.setFrames(Frames);
    // Act
    const a1 = fp.getCurrentFrame();
    const b1 = fp.getNextFrame();
    const c1 = fp.getNextFrame();
    const b2 = fp.getNextFrame();
    const a2 = fp.getNextFrame();
    const b3 = fp.getNextFrame();
    const c3 = fp.getNextFrame();

    // Assert
    expect(a1[0][0]).toBe("a");
    expect(b1[0][0]).toBe("b");
    expect(c1[0][0]).toBe("c");
    expect(b2[0][0]).toBe("b");
    expect(a2[0][0]).toBe("a");
    expect(b3[0][0]).toBe("b");
    expect(c3[0][0]).toBe("c");
});