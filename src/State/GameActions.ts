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
    "addParticles" |
    "removeEnemy" |
    "addExplosionCenter" |
    "removeExplosionCenter" |
    "removeParticle" |
    "phaserOnScreen" |
    "phaserOffScreen" |

    // Player
    "setPlayer" |
    "setBullet" |
    "setPlayerFormationPhase" |
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

    // Keyboard
    "keydown" |
    "keyup" |
    "addPhaser" |
    "removePhaser" |
    "setPhasers"
    ;

export default GameActions;