/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          String.test
 * Responsibility:  String string utility functions.
 */

import * as string from "../Utility/String";

test("pad left", () => {
    // Act
    const result1 = string.padLeft("1", 6, "0");
    const result2 = string.padLeft("12", 6, "0");
    const result3 = string.padLeft("123", 6, "0");
    const result4 = string.padLeft("1234", 6, "0");
    const result5 = string.padLeft("12345", 6, "0");
    const result6 = string.padLeft("123456", 6, "0");
    const result7 = string.padLeft("1234567", 6, "0");
    const result8 = string.padLeft("", 6, "0");

    // Assert
    expect(result1).toBe("000001");
    expect(result2).toBe("000012");
    expect(result3).toBe("000123");
    expect(result4).toBe("001234");
    expect(result5).toBe("012345");
    expect(result6).toBe("123456");
    expect(result7).toBe("1234567");
    expect(result8).toBe("000000");
});
