/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameConstants
 * Responsibility:  Constants used by the GameState reducer and by the Action creator functions
 */

enum GameStateEnum {
    setLives = 2000,
    removeLife,
    increaseScore,
    setLevel,
    nextLevel,
    addLifeAndPhaser,
    setPhasers,
    addPhaser,
    removePhaser,
    setPause,
    setWarpLevelComplexity,
    gameOver,
    resetGameState,
    bulletFired,
    phasersFired,
    enemyHit,
    setTimeLevelTimeLimit,
    resetScore,
}

export default GameStateEnum;