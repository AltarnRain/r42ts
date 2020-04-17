/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameActions from "../GameActions";
import { dispatch } from "../Store";

/**
 * Module:          GameStateDispatchers
 * Responsibility:  Dispatch actions for the game state
 */

export function setLives(value: number): void {
    dispatch({
        type: GameActions.setLives,
        payload: value,
    });
}

export function addLife(): void {
    dispatch({
        type: GameActions.addLife,
    });
}

export function addToScore(value: number): void {
    dispatch({
        type: GameActions.addToScore,
        payload: value,
    });
}
