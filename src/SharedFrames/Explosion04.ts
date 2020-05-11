
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";

/**
 * Module:          Explosion03.
 */

export default function getExplosion04(): Explosion {
    const explosion01: Explosion = {
        explosionCenterFrame: [
            ["V", "V", "0", "V", "V"],
            ["V", "V", "0", "V", "V"],
        ],
        particleFrames: [
            [
                ["V", "V"],
            ]
        ],
        angles: [160, 150, 20, 30],
        particleFrameIndexes: [0, 0, 0, 0],
        speed: 25,
        acceleration: 1.00,
        explosionCenterDelay: 10,
        speeds: [], // not used, all particles travel at the same speed
        useSpeed: true,
    };

    return explosion01;
}
