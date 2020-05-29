/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameTypes
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

export interface GameOver {
    type: typeof Constants.gameOver;
}

export interface ResetGameState {
    type: typeof Constants.resetGameState;
}

export interface BulletFired {
    type: typeof Constants.bulletFired;
}

export interface PhaserFired {
    type: typeof Constants.phasersFired;
}

export interface EnemyHit {
    type: typeof Constants.enemyHit;
}

export interface SetTimeLevelTimeLimit {
    type: typeof Constants.setTimeLevelTimeLimit;
    limit: number;
}

export interface ResetScore {
    type: typeof Constants.resetScore;
}

export interface SetPlaySounds {
    type: typeof Constants.playSounds;
    playSounds: boolean;
}

export type GameStateTypes =
    IncreaseScore |
    SetLives |
    RemoveLife |
    SetPhasers |
    AddPhaser |
    RemovePhaser |
    SetLevel |
    NextLevel |
    AddLifeAndPhaser |
    SetPause |
    SetWarpGateComplexity |
    GameOver |
    ResetGameState |
    BulletFired |
    PhaserFired |
    EnemyHit |
    SetTimeLevelTimeLimit |
    ResetScore |
    SetPlaySounds
    ;