/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Location.tests
 * Responsibility:  Test the location utility functions
 */

import GameLocation from "../Models/GameLocation";
import * as Location from "../Utility/Location";

test("fallsWithin", () => {
    // Arrange
    const location: GameLocation = {
        left: 100,
        top: 100,
    };

    // Act
    const within = Location.fallsWithin(location, 0, 150, 0, 200);

    // Assert
    expect(within).toBe(true);
});

test("calculateDistance", () => {

    const distance = Location.calculateDistance({left: 0, top: 0}, {left: 1, top: 0});

    expect(distance).toBeGreaterThan(0);
});

test("", () => {
    // Arrange
    const location: GameLocation = {
        left: 0,
        top: 0,
    };

    // Act
    const newLocation = Location.getNewLocation(location, 45, 5);

    // Assert
    expect(newLocation === location).toBe(false);
});