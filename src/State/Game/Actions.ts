/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Actions
 * Responsibility:  Action creator functions for the GameState
 */

import Constants from "./Constants";
import { AddLevel, AddLife, AddLifeAndPhaser, AddPhaser, IncreaseScore, NextLevel, RemoveLife, RemovePhaser, SetLevel, SetLives, SetPause, SetPhasers } from "./Types";

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