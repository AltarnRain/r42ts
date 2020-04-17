/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import ExplosionCenter from "../../Particles/ExplosionCenter";
import GameActions from "../GameActions";
import { dispatch } from "../Store";

/**
 * Module:          LevelActions
 * Responsibility:  Creates actions for the LevelReducer
 */

export function enemyState(action: "add" | "remove", enemy: BaseEnemyObject): void {
    dispatch( {
        type: action === "add" ? GameActions.addEnemy : GameActions.removeEnemy,
        payload: enemy,
    });
}

export function pauseState(action: "on" | "off"): void {
    dispatch( {
        type: action === "on" ? GameActions.pauseOn : GameActions.pauseOff,
    });
}

export function explosionCenterState(action: "add" | "remove", center: ExplosionCenter): void {
    dispatch( {
        type: action === "add" ? GameActions.addExplosionCenter : GameActions.removeExplosionCenter,
        payload: center,
    });
}

export function phaserState(action: "onscreen" | "offscreen"): void {
    dispatch( {
        type: action === "onscreen" ? GameActions.phaserOnScreen : GameActions.phaserOffScreen,
    });
}

export function numberOfEnemies(value: number): void {
    dispatch( {
        type: GameActions.numberOfEnemies,
        payload: value,
    });
}