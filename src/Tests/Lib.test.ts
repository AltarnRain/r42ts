/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Lib.test
 * Responsibility:  Tests the lib functions.
 */

import "jest";
import { getRandomArrayElement } from "../Utility/Lib";

test("getRandomArrayElement", () => {
    const arr = ["a"];

    const result = getRandomArrayElement(arr);

    expect(result).toBe("a");
});
