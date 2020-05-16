/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";
import getShipSpawnLocation from "../Providers/PlayerSpawnLocationProvider";
import { angles } from "./Angles";
import CGAColors from "./CGAColors";

/**
 * Module:          All speeds for all objects
 * Responsibility:  Define constants at which speed an enemy moves.
 */

const {
    gameField,
    pixelSize
} = dimensionProvider();

// Collective namespace for all speeds.
export namespace Speeds {

    export namespace Movement {
        export const bird = 1.3;
        export const robot = 1.3;
        export const orb = 0.1;
        export const spinner = 1.3;
        export const balloon = 1.3;
        export const crab = 1.3;
        export const bat = 1.3;
        export namespace Asteroid {
            export const down = [2, 4, 6, 8, 10];
            export const diagonal = [4, 5, 7, 10, 12];
        }
        export namespace SpaceMonster {
            export const down = [2, 4, 6, 8, 10];
            export const diagonal = [4, 4, 7, 10, 12];
        }
        export const diabolo = 1.3;
        export const devil = 1.3;

        export namespace Piston {
            export const slow = 1.3;
            export const fast = 3;
        }

        export namespace Boat {
            export const slow = 1.3;
            export const fast = 3;

        }
        export namespace Player {
            export const aliveSpeed = 9;
            export const formingSpeed = 4;
            export const warpUpSpeed = 3;
        }
    }

    export namespace Bullets {
        export const player = 38;
        export const robot = 11;
        export const orb = 11;
        export const spinner = 11;
        export const balloon = 11;
        export const piston = 11;
        export const diabolo = 11;
        export const devil = 11;
        export const crab = 11;
        export const bat = 11;
        export const cloakingOrb = 11;
        export const bird = 11;

    }
}

export namespace Locations {
    // All locations were determined by drawing a grid over screenshot.
    export namespace robot {
        export const topStart = gameField.top + pixelSize * 18;
        export const maxBottom = gameField.top + pixelSize * 65;
        export const scatteredMaxBottom = gameField.top + pixelSize * 45;
    }

    export namespace Orb {
        export const topStart = gameField.top + pixelSize * 18;
        export const maxTop = gameField.top + pixelSize * 5;
        export const maxBottom = gameField.top + pixelSize * 55;
    }
    export namespace Piston {
        export const topStart = gameField.top + pixelSize * 18;
    }
    export namespace Devil {
        export const maxBottom = gameField.top + pixelSize * 60;
    }

    export namespace Crab {
        export const topStart = gameField.top + pixelSize * 18;
    }
    export namespace Player {
        export const spawnLocation = getShipSpawnLocation();
    }

    export namespace Boat {
        export const topStart = pixelSize * 18;
    }
    export namespace CloakingOrb {
        export const maxBottom = pixelSize * 55;
    }
}

// Collective namespace for all movement angles.
export namespace MovementAngles {
    export const bird = [2, 358, 178, 182];
    export const robot = 5;
    export const spinner = [2, 358, 178, 182];
    export const piston = 170;
    export const diabolo = [2, 358, 178, 182];
    export const devil = [angles.leftdown, angles.rightdown];
}

// Collective namespace for all frametimes.
export namespace FrameTimes {
    export const bird = 100;
    export const robot = 200;
    export const orb = 200;
    export const spinner = 100;
    export const balloon = 100;
    export const piston = 200;
    export const diabolo = 200;
    export const crab = 100;
    export const bat = 100;
    export const boat = 200;
    export  const cloakingOrb = 150;
    export  const fish = 150;
}

export namespace Points {
    export const bird = 200;
    export const robot = 200;
    export const orb = 300;
    export const spinner = 200;
    export const balloon = 200;
    export const asteroid = 300;
    export const piston = 200;
    export const diabolo = 200;
    export const spaceMonster = 200;
    export const devil = 100;
    export const crab = 200;
    export const bat = 200;
    export const boat = 200;
    export const cloakingOrb = 200;
    export const fish = 200;

}

export namespace WarpLevelConstants {
    export const heightPixelCount = 72;
    export const top = pixelSize * 8;
    export const height = heightPixelCount * pixelSize;
    export const left = gameField.left + pixelSize;
    export const right = gameField.right - pixelSize * 2;
    export const bottom = top + height;
    export const width = pixelSize * 16;
}

export namespace ColorSchemes {
    export const robot = [
        CGAColors.lightBlue,
        CGAColors.lightCyan,
        CGAColors.lightRed,
        CGAColors.lightGreen,
        CGAColors.lightBlue,
        CGAColors.lightMagenta,
    ];

    export const cloakingOrb = [
        CGAColors.lightBlue,
        CGAColors.lightCyan,
        CGAColors.lightRed,
        CGAColors.lightGreen,
        CGAColors.lightBlue,
        CGAColors.lightMagenta,
    ];
}