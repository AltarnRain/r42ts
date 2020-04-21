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
import dimensionProvider from "../Providers/DimensionProvider";

test("Test the dimension provider if there is no 'body' element", () => {
    // Act
    expect(dimensionProvider).toThrowError("No body element found.");
});