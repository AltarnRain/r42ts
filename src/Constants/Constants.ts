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
    export const diaboloHardLeftRight = [0, 180];
    export const diaboloHardUpDown = [90, 270];
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
    export const cloakingOrb = 150;
    export const fish = 150;
}

// Colletive namespace for all ememy points. Enemy points are award per enemy. Doesn't matter which level they appear.
export namespace Points {
    export const bird = 200;
    export const robot = 100;
    export const orb = 200;
    export const spinner = 200;
    export const balloon = 200;
    export const asteroid = 300;
    export const piston = 200;
    export const diabolo = 200;
    export const spaceMonster = 300;
    export const devil = 100;
    export const crab = 200;
    export const bat = 200;
    export const boat = 200;
    export const cloakingOrb = 100;
    export const fish = 100;
    export const warpLevel = [
        1300,
        1400,
        1500,
        1600,
        1700,
    ];
}

export namespace WarpLevelConstants {
    export const heightPixelCount = 72;
    export const top = pixelSize * 8;
    export const height = heightPixelCount * pixelSize;
    export const left = gameField.left + pixelSize;
    export const right = gameField.right - pixelSize * 2;
    export const bottom = top + height;
    export const width = pixelSize * 16.5;
}

/**
 * Colors used by enemies. These are either picked randomly or picked at the beginning of a level.
 */
export namespace ColorSchemes {
    export namespace Enemies {
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

        export const orb: string[][] = [
            [CGAColors.lightGreen, CGAColors.lightBlue],
            [CGAColors.brown, CGAColors.lightGreen],
            [CGAColors.lightBlue, CGAColors.white],
            [CGAColors.white, CGAColors.brown],
        ];
    }

    export namespace Explosions {
        export const spaceMonster = [
            CGAColors.yellow,
            CGAColors.lightGreen,
            CGAColors.lightBlue,
        ];
    }

    export const birds = [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed];
}