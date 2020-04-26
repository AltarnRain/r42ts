
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Explosion01.
 */

import Explosion from "../Models/Explosion";

const Explosion01: Explosion = {
    explosionCenterFrame: [
        ["V", "0", "V", "0"],
        ["V", "V", "V", "V"],
        ["0", "V", "0", "V"],
    ],
    particleFrames: [
        [
            ["V"],
        ],
        [
            ["V", "V"]
        ],
    ],
    angles: [160, 180, 200, 340, 0, 20],
    particleFrameIndexes: [0, 1, 0, 0, 1, 0],
    speed: 7,
    acceleration: 1.05,
    explosionCenterDelay: 20,
    speeds: [], // not used, all particles travel at the same speed
    useSpeed: true,
};

export default function getExplosion01(): Explosion {
    return JSON.parse(JSON.stringify(Explosion01)) as Explosion;
}
