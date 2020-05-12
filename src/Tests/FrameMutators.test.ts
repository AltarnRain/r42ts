/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import CGAColors from "../Constants/CGAColors";
import { Frame } from "../Types";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          FramesMutators.test
 * Responsibility:  Test the Frame utility class.
 */

test("converFramesColor", () => {
    // Arrange
    const f: Frame[] = [[["E"]]];

    // Act
    Mutators.Frames.convertHexToCGA(f);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.yellow);
});

test("convertFrameColor", () => {
    // Arrange
    const f: Frame = [["E"]];

    // Act
    Mutators.Frame.convertHexToCGA(f);

    // Assert
    expect(f[0][0]).toBe(CGAColors.yellow);
});

test("convertVariableFramesColor", () => {
    // Arrange
    const f: Frame[] = [
        [["V"]]
    ];

    // Act
    Mutators.Frames.setColor(f, CGAColors.green);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.green);
});

test("setFramesColor", () => {
    // Arrange
    const f: Frame[] = [
        [["NotAColor"]]
    ];

    // Act
    Mutators.Frames.setColor(f, CGAColors.lightRed);

    // Assert
    expect(f[0][0][0]).toBe(CGAColors.lightRed);
});

test("setFrameColor", () => {
    // Arrange
    const f: Frame = [["NotAColor"]];

    // Act
    Mutators.Frame.setColor(f, CGAColors.lightCyan);

    // Assert
    expect(f[0][0]).toBe(CGAColors.lightCyan);
});