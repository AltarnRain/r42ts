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
    gameField
} = dimensionProvider();

// Collective namespace for all speeds.
export namespace Speeds {

    export namespace Movement {
        // Enemy speeds
        export const bird = 1.5;

        export const robot = 1.5;

        export const orb = 0.1;
    }

    export namespace Bullets {
        // bullet speeds
        export const player = 42;
        export const robot = 7;
        export const orb = 13;
    }
}

export namespace Locations {
    export namespace Enemies {

        export namespace robot {
            export const topStart = gameField.top + gameField.height / 7;
            export const maxTop = gameField.top + gameField.height * 0.1;
            export const maxBottom = gameField.top + gameField.height * 0.2;

        }

        export namespace Orb {
            export const topStart = gameField.top + gameField.height / 4;
            export const maxTop = gameField.top + gameField.height * 1 / 10;
            export const maxBottom = gameField.top + (gameField.height * 2 / 3);
        }
    }
}

// Collective namespace for all movement angles.
export namespace MovementAngles {
    export const birdRandom = [2, 358, 178, 182];

    export const robot = 5;

    export const orb = 90;
}

// Collective namespace for all frametimes.
export namespace FrameTimes {

    export const bird = 100;

    export const robot = 200;

    export const orb = 200;
}
