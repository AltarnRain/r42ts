/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameActions
 * Responsibility:  Action creator functions for the GameState
 */

import Constants from "./GameConstants";
import { AddLevel, AddLife, AddLifeAndPhaser, AddPhaser, BulletFired, EnemyHit, GameOver, GameStart, IncreaseScore, NextLevel, PhaserFired, RemoveLife, RemovePhaser, SetLevel, SetLives, SetPause, SetPhasers, SetTimeLevelTimeLimit, SetWarpGateComplexity, ResetScore } from "./GameTypes";
import { WarpLevelComplexity } from "./WarpLevelTypes";

export function increaseScore(score: number): IncreaseScore {
    return {
        type: Constants.increaseScore,
        payload: score
    };
}

export function setLives(lives: number): SetLives {
    return {
        type: Constants.setLives,
        payload: lives,
    };
}

export function addLife(): AddLife {
    return {
        type: Constants.addLife,
    };
}

export function removeLife(): RemoveLife {
    return {
        type: Constants.removeLife,
    };
}

export function setPhasers(phasers: number): SetPhasers {
    return { type: Constants.setPhasers, payload: phasers };
}

export function addPhaser(): AddPhaser {
    return { type: Constants.addPhaser };
}

export function removePhaser(): RemovePhaser {
    return { type: Constants.removePhaser };
}

export function addLevel(): AddLevel {
    return { type: Constants.addLevel };
}

export function setLevel(level: number): SetLevel {
    return { type: Constants.setLevel, payload: level };
}

export function nextLevel(): NextLevel {
    return { type: Constants.nextLevel };
}

export function addLifeAndPhaser(): AddLifeAndPhaser {
    return { type: Constants.addLifeAndPhaser };
}

export function setPause(pause: boolean): SetPause {
    return {
        type: Constants.setPause,
        payload: pause,
    };
}

export function setWarpGamteComplexity(complexity: WarpLevelComplexity): SetWarpGateComplexity {
    return {
        type: Constants.setWarpLevelComplexity,
        complexity,
    };
}

export function gameOver(): GameOver {
    return {
        type: Constants.gameOver,
    };
}

export function gameStart(): GameStart {
    return {
        type: Constants.gameStart,
    };
}

export function enemeyHit(): EnemyHit {
    return {
        type: Constants.enemyHit,
    };
}

export function phaserFired(): PhaserFired {
    return {
        type: Constants.phasersFired,
    };
}

export function bulletFired(): BulletFired {
    return {
        type: Constants.bulletFired,
    };
}

export function setTimeLevelTimeLimit(limit: number): SetTimeLevelTimeLimit {
    return {
        type: Constants.setTimeLevelTimeLimit,
        limit,
    };
}

export function resetScore(): ResetScore {
    return {
        type: Constants.resetScore,
    };
}