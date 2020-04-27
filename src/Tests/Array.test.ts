/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import * as array from "../Utility/Array";

/**
 * Module:          Array.test
 * Responsibility:  Tests the array utility functions
 */

test("getRandomArrayElement", () => {
    const arr = ["a"];

    const result = array.getRandomArrayElement(arr);

    expect(result).toBe("a");
});
