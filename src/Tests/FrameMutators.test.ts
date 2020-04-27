/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import { Frame, Frames } from "../Types/Types";
import FrameMutators from "../Utility/FrameMutators";

/**
 * Module:          FramesMutators.test
 * Responsibility:  Test the Frame utility class.
 */

test("converFramesColor", () => {
    // Arrange
    const f: Frames = [[["E"]]];

    // Act
    FrameMutators.convertFramesColors(f);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.yellow);
});

test("convertFrameColor", () => {
    // Arrange
    const f: Frame = [["E"]];

    // Act
    FrameMutators.convertFrameColor(f);

    // Assert
    expect(f[0][0]).toBe(CGAColors.yellow);
});

test("convertVariableFramesColor", () => {
    // Arrange
    const f: Frames = [
        [["V"]]
    ];

    // Act
    FrameMutators.convertVariableFramesColor(f, CGAColors.green);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.green);
});

test("convertVariableFrameColor", () => {
    // Arrange
    const f: Frame = [["V"]];

    // Act
    FrameMutators.convertVariableFrameColor(f, CGAColors.lightBlue);

    // Assert
    expect(f[0][0]).toBe(CGAColors.lightBlue);
});

test("setFramesColor", () => {
    // Arrange
    const f: Frames = [
        [["NotAColor"]]
    ];

    // Act
    FrameMutators.setFramesColor(f, CGAColors.lightRed);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.lightRed);
});

test("setFrameColor", () => {
    // Arrange
    const f: Frame = [["NotAColor"]];

    // Act
    FrameMutators.setFrameColor(f, CGAColors.lightCyan);

    // Assert
    expect(f[0][0]).toBe(CGAColors.lightCyan);
});