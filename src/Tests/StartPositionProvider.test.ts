/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StartPositionProvider tests
 * Responsibility:  Test methods from the start provider.
 */

import "jest";
import { RandomStartPosition } from "../Providers/StartPositionProvider";

test("Test if the RandomStartPositionProvider returns a value that always falls within the limit", () => {

    const positions: number[] = [];

    // RandomStart position uses Math.random to generate a random number. Do 1000 iterations.
    for (let index = 0; index < 1000; index++) {
        positions.push(RandomStartPosition(1024, 20));
    }

    // Assert
    expect(positions.every((p) => p < 1024)).toBe(true);
    expect(positions.every((p) => p >= 0)).toBe(true);
});