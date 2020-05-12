/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import * as Geometry from "../Utility/Geometry";

/**
 * Module:          Geometry.test
 * Responsibility:  Tests Geometry functions
 */

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
        const result1 = Geometry.calculateAngleDifference(100, 80);
        const result2 = Geometry.calculateAngleDifference(10, 350);

        expect(result1).toBe(20);
        expect(result2).toBe(20);
    });

    test("get left or right direction from angle", () => {
        const result1 = Geometry.getLeftOrRightFromAngle(0);
        const result2 = Geometry.getLeftOrRightFromAngle(360);
        const result3 = Geometry.getLeftOrRightFromAngle(325);
        const result4 = Geometry.getLeftOrRightFromAngle(45);

        const result5 = Geometry.getLeftOrRightFromAngle(235);
        const result6 = Geometry.getLeftOrRightFromAngle(180);
        const result7 = Geometry.getLeftOrRightFromAngle(135);

        const result8 = Geometry.getLeftOrRightFromAngle(90);
        const result9 = Geometry.getLeftOrRightFromAngle(270);

        expect(result1).toBe("right");
        expect(result2).toBe("right");
        expect(result3).toBe("right");
        expect(result4).toBe("right");

        expect(result5).toBe("left");
        expect(result6).toBe("left");
        expect(result7).toBe("left");

        expect(result8).toBe(undefined);
        expect(result9).toBe(undefined);
    });
});