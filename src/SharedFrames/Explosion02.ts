/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";

/**
 * Module:          Explosion02
 */

export default function getExplosion02(): Explosion {
    const Explosion02: Explosion = {
        explosionCenterFrame: [
            ["V", "V", "V", "V"],
            ["0", "0", "0", "0"],
            ["V", "V", "V", "V"],
            ["0", "0", "0", "0"],
            ["V", "V", "V", "V"],
        ],
        particleFrames: [
            [
                ["V", "V"]
            ],
        ],
        angles: [160, 180, 200, 340, 0, 20],
        particleFrameIndexes: [0, 0, 0, 0, 0, 0],
        speed: 12,
        acceleration: 1.05,
        explosionCenterDelay: 40,
        speeds: [], // not used, all particles travel at the same speed
        useSpeed: true,
    };

    return Explosion02;
}