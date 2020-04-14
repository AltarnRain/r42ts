/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Geometry.test
 * Responsibility:  Tests Geometry functions
 */

import GameLocation from "../Models/GameLocation";
import * as Geometry from "../Utility/Geometry";

describe("geometry tests", () => {
    test("reverseDegreeAngle", () => {
        // Act
        const a1 = Geometry.reverseDegreeAngle(0);
        const a2 = Geometry.reverseDegreeAngle(90);
        const a3 = Geometry.reverseDegreeAngle(180);
        const a4 = Geometry.reverseDegreeAngle(270);

        // Assert
        expect(a1).toBe(180);
        expect(a2).toBe(270);
        expect(a3).toBe(360);
        expect(a4).toBe(90);
    });

    test("calculateVector when the dy is 0, it should still return an angle", () => {
        const sourceLocation: GameLocation = {
            top: 0,
            left: 0,
        };

        // Act
        const angle1 = Geometry.calculateAngle(sourceLocation, { top: 0, left: 10 });

        // Assert
        expect(angle1).not.toBe(-0);
    });

    test("calculateVector when the dx is 0, it should still return an angle", () => {
        const sourceLocation: GameLocation = {
            top: 0,
            left: 1,
        };

        // Act
        const angle1 = Geometry.calculateAngle(sourceLocation, { top: 100, left: 1 });

        // Assert
        expect(angle1).not.toBe(-90);
    });
});