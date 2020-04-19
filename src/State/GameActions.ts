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
    "setPhaserFrames" |
    "clearPhaserFrames" |

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
    "showingLevelBanner" |
    "nextLevel" |
    "levelRunning" |

    // Keyboard
    "keydown" |
    "keyup" |
    "addPhaser" |
    "removePhaser" |
    "setPhasers"
    ;

export default GameActions;