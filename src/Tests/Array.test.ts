/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Array.test
 * Responsibility:  Tests the array utility functions
 */

import * as array from "../Utility/Array";

test("getRandomArrayElement", () => {
    const arr = ["a"];

    const result = array.getRandomArrayElement(arr);

    expect(result).toBe("a");
});
