/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "../Providers/DimensionProvider";

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
        // Enemy speeds
        export const bird = 1.5;

        export const robot = 1.5;

        export const orb = 0.1;

        export const spinner = 1.5;
    }

    export namespace Bullets {
        // bullet speeds
        export const player = 42;
        export const robot = 7;
        export const orb = 12;
        export const spinner = 12;
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
    }
}

// Collective namespace for all movement angles.
export namespace MovementAngles {
    export const bird = [2, 358, 178, 182];

    export const robot = 5;

    export const orb = 90;

    export const spinner = [2, 358, 178, 182];
}

// Collective namespace for all frametimes.
export namespace FrameTimes {

    export const bird = 100;

    export const robot = 200;

    export const orb = 200;

    export const spinner = 100;
}