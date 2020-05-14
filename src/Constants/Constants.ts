/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";
import { angles } from "./Angles";

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
        export const bird = 1.5;
        export const robot = 1.5;
        export const orb = 0.1;
        export const spinner = 1.5;
        export const balloon = 1.5;
        export const crab = 1.5;

        export namespace Asteroid {
            export const down = [2, 4, 6, 8, 10];
            export const diagonal = [3, 5, 7, 10, 12];
        }

        export namespace SpaceMonster {
            export const down = [2, 4, 6, 8, 10];
            export const diagonal = [3, 54, 7, 10, 12];

        }
        export const diabolo = 2.5;
        export const devil = 2.5;

        export namespace Piston {
            export const slow = 2;
            export const fast = 4;
        }
    }

    export namespace Bullets {
        export const player = 42;
        export const robot = 7;
        export const orb = 12;
        export const spinner = 12;
        export const balloon = 12;
        export const piston = 12;
        export const diabolo = 12;
        export const devil = 12;
        export const crab = 12;

    }
}

export namespace Locations {
    export namespace Enemies {

        // All locations were determined by drawing a grid over screenshot.
        export namespace robot {
            export const topStart = gameField.top + pixelSize * 18;
            export const maxBottom = gameField.top + pixelSize * 65;
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
    }
}

// Collective namespace for all movement angles.
export namespace MovementAngles {
    export const bird = [2, 358, 178, 182];
    export const robot = 5;
    export const orb = 90;
    export const spinner = [2, 358, 178, 182];
    export const piston = 175;
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

}