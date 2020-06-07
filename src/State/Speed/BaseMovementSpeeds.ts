
/**
 * Base speeds for moving at 60 FPS
 */

const baseMovementSpeeds = {
    bird: 1.3,
    robot: 1.3,
    orb: 0.1,
    spinner: 1.3,
    balloon: 1.3,
    crab: 1.3,
    bat: 1.3,
    Asteroid: {
        down: [2, 4, 6, 8, 10],
        diagonal: [5, 7, 10, 10, 10, 12],
    },
    SpaceMonster: {
        down: [2, 4, 6, 8, 10],
        diagonal: [6, 7, 10, 10, 12, 12],
    },
    diabolo: 1.3,
    devil: 1.3,
    Piston: {
        slow: 1.3,
        fast: 3,
    },
    Boat: {
        slow: 1.3,
        fast: 3.5,
    },
    Player: {
        aliveSpeed: {
            speedX: 10,
            speedY: 9,
        },
        formingSpeed: 4,
        warpUpSpeed: 3.2,
    }
};

export default baseMovementSpeeds;