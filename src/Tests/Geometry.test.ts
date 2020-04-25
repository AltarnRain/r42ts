/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Geometry.test
 * Responsibility:  Tests Geometry functions
 */

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

    test("calculate angle difference", () => {
        const result1 = Geometry.calculateDegreeDifference(100, 80);
        const result2 = Geometry.calculateDegreeDifference(10, 350);

        expect(result1).toBe(20);
        expect(result2).toBe(20);
    });
});