/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          DimensionProvider tests.
 * Responsibility:  Tests the DimensionProvider
 */

import "jest";
import DimensionProvider from "../Providers/DimensionProvider";

test("Test the dimension provider if there is no 'body' element", () => {
    // Act
    expect(DimensionProvider).toThrowError("No body element found.");
});

test("Test if the dimension provider returns the expected dimensions", () => {
    // Arrange

    const el = document.createElement("body");

    // Act
    const result = DimensionProvider(el);

    // Assert
    expect(result).toBeDefined();
    expect(result.fullHeight).toBeDefined();
    expect(result.fullWidth).toBeDefined();
    expect(result.gameFieldHeight).toBeDefined();
    expect(result.gameFieldTop).toBeDefined();
    expect(result.maxPixelSize).toBeDefined();
    expect(result.statusBarHeight).toBeDefined();
});