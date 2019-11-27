
/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Explosion asset.
 * Responsibility:  Contain the assets of an explosion.
 */

import { Explosion } from "../../Models/Explosion";

const ExplosionAsset01: Explosion = {
    frame: [
        ["F", "0", "F", "0"],
        ["F", "F", "F", "F"],
        ["0", "F", "0", "F"],
    ],
    particles: [
        [
            ["F"],
        ],
        [
            ["F", "F"]
        ],
    ],
    angles: [150, 180, 210, 330, 0, 30], // ul, l, ll, ur, r,
    particleFrames: [0, 1, 0, 0, 1, 0],
    speed: 10,
    acceleration: 1.05,
    explosionCenterDelay: 100,
    speeds: [], // not used, all particles travel at the same speed
    useSpeed: true,
};

export default ExplosionAsset01;
