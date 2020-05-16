
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../../Models/Explosion";

/**
 * Module:          Explosion01.
 */

export default function getDevilExplosion(): Explosion {
    const explosion: Explosion = {
        explosionCenterFrame: [
            ["0", "4", "4", "0"],
            ["0", "0", "0", "0"],
            ["4", "2", "2", "4"],
            ["0", "0", "0", "0"],
            ["4", "0", "0", "4"],
        ],
        particleFrames: [
            [
                ["4"],
            ],
            [
                ["4", "2"],
            ],
            [
                ["2", "4"],
            ]
        ],
        angles: [160, 180, 200, 340, 0, 20],
        particleFrameIndexes: [0, 1, 0, 0, 2, 0],
        speed: 17,
        acceleration: 1.05,
        explosionCenterDelay: 30,
        speeds: [], // not used, all particles travel at the same speed
        useSpeed: true,
    };

    return explosion;
}
