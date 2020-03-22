/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          KeyboardReducer tests
 * Responsibility:  Tests the keyboard reducer.
 */

import "jest";
import { GameControlKeys } from "../Constants/KeyConstants";
import ActionPayload from "../Store/Definitions/ActionPayload";
import KeyboardState from "../Store/Definitions/KeyboardState";
import GameActions from "../Store/GameActions";
import keyboardReducer from "../Store/Reducers/KeyboardReducer";

test("Handle keydown", () => {

    // Arrange
    const action: ActionPayload = {
        type: GameActions.keyDown,
        payload: GameControlKeys.ArrowDown,
    };

    const state: KeyboardState = {
        down: false,
    } as KeyboardState;

    // Act
    const result = keyboardReducer(state, action);

    // Assert
    expect(result.down).toBe(true);
});

test("Handle up", () => {

    // Arrange
    const action: ActionPayload = {
        type: GameActions.keyUp,
        payload: GameControlKeys.ArrowDown,
    };

    const state: KeyboardState = {
        down: true,
    } as KeyboardState;

    // Act
    const result = keyboardReducer(state, action);

    // Assert
    expect(result.down).toBe(false);
});