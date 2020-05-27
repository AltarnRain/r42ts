/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import dimensionProvider from "./DimensionProvider";

/**
 * Module:          SpeedProvider
 * Responsibility:  Provides all speeds used on game.
 */

const {
    pixelSize
} = dimensionProvider();

export default class SpeedProvider {

    /**
     * Singleton class.
     */
    private static instance: SpeedProvider;

    /**
     * Movemnt speeds.
     */
    public movement: typeof BaseMovement;

    /**
     * Bullet speeds.
     */
    public bullets: typeof Bullets;

    /**
     * Minimum distance
     */
    public minimumDistance: number;

    /**
     * Phaser speed.
     */
    public phaserSpeed: number;

    /**
     * Construct the object.
     */
    private constructor(fps: number, width: number) {
        this.movement = convertSpeeds(BaseMovement, width, fps);
        this.bullets = convertSpeeds(Bullets, width, fps);
        this.minimumDistance = calculateSpeed(20, width, fps);
        
        this.phaserSpeed = calculateSpeed(pixelSize, width, fps);
    }

    /**
     * Creator function.
     * @param {number} fps. Fps.
     * @param {number} width. with.
     */
    public static create(fps: number, width: number): void {
        if (SpeedProvider.instance === undefined) {
            SpeedProvider.instance = new SpeedProvider(fps, width);
        }
    }

    /**
     * Returns an instance of the SpeedProvider
     * @returns {SpeedProvider}.
     */
    public static get(): SpeedProvider {
        return SpeedProvider.instance;
    }
}

/**
 * Calculates a speed.
 * @param {number} speed. Speed in pixels per tick.
 * @param {number} width. Available width.
 * @param {number} fps. Supported fps.
 */
export function calculateSpeed(speed: number, width: number, fps: number): number {
    // 1600 is the size of the canvas width when I was developing the game. All game speeds are based on this.
    // 60 is the fps of Chrome on my laptop, but some screens have
    // different refresh rates.
    return speed * (width / 1600 * (60 / fps));
}

/**
 * Converts a 'speed' object. It is a 1 on 1 copy but the speeds are all recalculated.
 * @param {any} a. any.
 */
function convertSpeeds(a: any, width: number, fps: number): any {
    const base: any = {};
    for (const key of Object.keys(a)) {
        const keyValue = a[key];

        if (typeof keyValue === "number") {
            base[key] = calculateSpeed(keyValue, width, fps);
        } else if (Array.isArray(keyValue)) {
            base[key] = keyValue.map((v) => calculateSpeed(v, width, fps));
        } else if (typeof keyValue === "object" && keyValue !== null) {
            base[key] = convertSpeeds(keyValue, width, fps);
        } else {
            throw new Error("Not a supported value");
        }
    }

    return base;
}

/**
 * Base speeds for moving at 60 FPS
 */
const BaseMovement = {
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
        aliveSpeed: 9,
        formingSpeed: 4,
        warpUpSpeed: 3.2,
    }
};

/**
 * Base bullet speeds at 60 fps.
 */
const Bullets = {
    player: 38,
    robot: 11,
    orb: 11,
    spinner: 11,
    balloon: 11,
    piston: 11,
    diabolo: 11,
    devil: 11,
    crab: 11,
    bat: 11,
    cloakingOrb: 11,
    bird: 11,
    fish: 11,
};
