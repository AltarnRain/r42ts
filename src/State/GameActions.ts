/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameActions
 * Responsibility:  Provide string typings for GameActions
 */

type GameActions =
    // Debugging
    "playerImmortal" |
    "playerMortal" |
    "renderPhaserOn" |
    "renderPhaserOff" |
    "hitboxesOn" |
    "hitboxesOff" |

    // Level
    "resetLevelState" |
    "setEnemies" |
    "addParticle" |
    "addParticles" |
    "removeEnemy" |
    "addExplosionCenter" |
    "removeExplosionCenter" |
    "removeParticle" |
    "setPhaserFrames" |
    "clearPhaserFrames" |
    "setFireInterval" |
    "setEnemyFireTick" |

    // Player
    "setPlayer" |
    "setBullet" |
    "setPlayerMovementLimit" |
    "setPlayerLocation" |

    // GameState
    "setLives" |
    "addLife" |
    "removeLife" |
    "increaseScore" |
    "pauseOn" |
    "pauseOff" |
    "addLevel" |
    "setLevel" |
    "nextLevel" |
    "addLifeAndPhaser" |

    // Keyboard
    "keydown" |
    "keyup" |
    "addPhaser" |
    "removePhaser" |
    "setPhasers"
    ;

export default GameActions;