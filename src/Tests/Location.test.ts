/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import * as Location from "../Utility/Location";

/**
 * Module:          Location.tests
 * Responsibility:  Test the location utility functions
 */

test("fallsWithin", () => {
    // Act
    const within = Location.fallsWithin(100, 100, 0, 150, 0, 200);

    // Assert
    expect(within).toBe(true);
});

test("calculateDistance", () => {

    const distance = Location.calculateDistance( 0, 0, 1, 0);

    expect(distance).toBeGreaterThan(0);
});