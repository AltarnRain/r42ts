/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameConstants
 * Responsibility:  Constants used by the GameState reducer and by the Action creator functions
 */

namespace Constants {
    export const setLives = "setLives";
    export const removeLife = "removeLife";
    export const increaseScore = "increaseScore";
    export const setLevel = "setLevel";
    export const nextLevel = "nextLevel";
    export const addLifeAndPhaser = "addLifeAndPhaser";
    export const setPhasers = "setPhasers";
    export const addPhaser = "addPhaser";
    export const removePhaser = "removePhaser";
    export const setPause = "setPause";
    export const setWarpLevelComplexity = "setWarpLevelComplexity";
    export const gameOver = "gameOver";
    export const gameStart = "gameStart";
    export const bulletFired = "bulletFired";
    export const phasersFired = "phasersFired";
    export const enemyHit = "enemyHit";
    export const setTimeLevelTimeLimit = "setTimeLevelTimeLimit";
    export const resetScore = "resetScore";
}

export default Constants;