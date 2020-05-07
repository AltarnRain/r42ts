/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Types
 * Responsibility:  Action return types for the GameState
 */

import Constants from "./GameConstants";
import { WarpLevelComplexity } from "./WarpLevelTypes";

export interface IncreaseScore {
    type: typeof Constants.increaseScore;
    payload: number;
}

export interface SetLives {
    type: typeof Constants.setLives;
    payload: number;
}

export interface AddLife {
    type: typeof Constants.addLife;
}

export interface RemoveLife {
    type: typeof Constants.removeLife;
}

export interface SetPhasers {
    type: typeof Constants.setPhasers;
    payload: number;
}

export interface AddPhaser {
    type: typeof Constants.addPhaser;
}

export interface RemovePhaser {
    type: typeof Constants.removePhaser;
}

export interface AddLevel {
    type: typeof Constants.addLevel;
}

export interface SetLevel {
    type: typeof Constants.setLevel;
    payload: number;
}

export interface NextLevel {
    type: typeof Constants.nextLevel;
}

export interface AddLifeAndPhaser {
    type: typeof Constants.addLifeAndPhaser;
}

export interface SetPause {
    type: typeof Constants.setPause;
    payload: boolean;
}

export interface SetWarpGateComplexity {
    type: typeof Constants.setWarpLevelComplexity;
    complexity: WarpLevelComplexity;
}

export type GameStateTypes =
    IncreaseScore |
    SetLives |
    AddLife |
    RemoveLife |
    SetPhasers |
    AddPhaser |
    RemovePhaser |
    AddLevel |
    SetLevel |
    NextLevel |
    AddLifeAndPhaser |
    SetPause |
    SetWarpGateComplexity
    ;