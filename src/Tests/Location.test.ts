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
import { fallsWithin } from "../Utility/Location";

test("fallsWithin", () => {
    // Arrange
    const location: GameLocation = {
        left: 100,
        top: 100,
    };

    // Act
    const within = fallsWithin(location, 0, 150, 0, 200);

    // Assert
    expect(within).toBe(true);
});
