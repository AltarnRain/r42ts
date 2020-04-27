/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import "jest";
import TickHandler from "../Handlers/TickHandler";

/**
 * Module:          TickHandler tests
 * Responsibility:  Test the tick handler.
 */

test("Test if the tick handler does not fire an event when the tick count is to low.", () => {

    // Arrange
    let fired = false;

    const th = new TickHandler(10, () => {
        fired = true;
    });

    // Act - tick count to low.
    th.tick(5);

    // Assert - should not have fired callback
    expect(fired).toBeFalsy();
});

test("Test if the tick handler does fires an event when the exact tick count is the same as the tick time", () => {

    // Arrange
    let fired = false;

    const th = new TickHandler(10, () => {
        fired = true;
    });

    // Act
    th.tick(10);

    // Assert
    expect(fired).toBeTruthy();
});

test("Test if the tick handler fires an event when the tick count has passed the tick time", () => {

    // Arrange
    let fired = false;

    const th = new TickHandler(10, () => {
        fired = true;
    });

    // Act
    th.tick(11);

    // Assert
    expect(fired).toBeTruthy();
});

test("Test if the tick handler fires the event again when the tick time has passed a second time", () => {
    // Arrange
    let fired = false;

    const th = new TickHandler(10, () => {
        fired = true;
    });

    // First tick.
    th.tick(10);

    expect(fired).toBeTruthy();

    // reset fired
    fired = false;

    // Act
    th.tick(20);

    // Assert
    expect(fired).toBeTruthy();
});