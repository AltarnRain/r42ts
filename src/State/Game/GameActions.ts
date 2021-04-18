/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameActions
 * Responsibility:  Action creator functions for the GameState
 */

import GameStateEnum from "./GameEnum";
import { AddLifeAndPhaser, AddPhaser, BulletFired, EnemyHit, GameOver, IncreaseScore, NextLevel, PhaserFired, RemoveLife, RemovePhaser, ResetGameState, ResetScore, SetLevel, SetLives, SetPause, SetPhasers, SetScreenState, SetTimeLevelTimeLimit, SetWarpGateComplexity } from "./GameTypes";
import { ScreenState } from "./UITypes";
import { WarpLevelComplexity } from "./WarpLevelTypes";

export function increaseScore(score: number): IncreaseScore {
    return {
        type: GameStateEnum.increaseScore,
        payload: score
    };
}

export function setLives(lives: number): SetLives {
    return {
        type: GameStateEnum.setLives,
        payload: lives,
    };
}

export function removeLife(): RemoveLife {
    return {
        type: GameStateEnum.removeLife,
    };
}

export function setPhasers(phasers: number): SetPhasers {
    return { type: GameStateEnum.setPhasers, payload: phasers };
}

export function addPhaser(): AddPhaser {
    return { type: GameStateEnum.addPhaser };
}

export function removePhaser(): RemovePhaser {
    return { type: GameStateEnum.removePhaser };
}

export function setLevel(level: number): SetLevel {
    return { type: GameStateEnum.setLevel, payload: level };
}

export function nextLevel(): NextLevel {
    return { type: GameStateEnum.nextLevel };
}

export function addLifeAndPhaser(): AddLifeAndPhaser {
    return { type: GameStateEnum.addLifeAndPhaser };
}

export function setPause(pause: boolean): SetPause {
    return {
        type: GameStateEnum.setPause,
        payload: pause,
    };
}

export function setWarpGamteComplexity(complexity: WarpLevelComplexity): SetWarpGateComplexity {
    return {
        type: GameStateEnum.setWarpLevelComplexity,
        complexity,
    };
}

export function gameOver(): GameOver {
    return {
        type: GameStateEnum.gameOver,
    };
}

export function gameStart(): ResetGameState {
    return {
        type: GameStateEnum.resetGameState,
    };
}

export function enemeyHit(): EnemyHit {
    return {
        type: GameStateEnum.enemyHit,
    };
}

export function phaserFired(): PhaserFired {
    return {
        type: GameStateEnum.phasersFired,
    };
}

export function bulletFired(): BulletFired {
    return {
        type: GameStateEnum.bulletFired,
    };
}

export function setTimeLevelTimeLimit(limit: number): SetTimeLevelTimeLimit {
    return {
        type: GameStateEnum.setTimeLevelTimeLimit,
        limit,
    };
}

export function resetScore(): ResetScore {
    return {
        type: GameStateEnum.resetScore,
    };
}

export function setScreenState(screenState: ScreenState): SetScreenState {
    return {
        type: GameStateEnum.setScreenState,
        screenState,
    }
}