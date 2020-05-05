/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          ParticleState
 * Responsibility:  Definition for a single particle's state.
 */

import { GameRectangle } from "../../Models/GameRectangle";
import { Frame } from "../../Types";

export interface ParticleState {
    coloredFrame: Frame;
    hitbox: GameRectangle;
    speed: number;
    angle: number;
    acceletation: number;
    left: number;
    top: number;
}
