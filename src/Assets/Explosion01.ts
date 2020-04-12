
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Explosion asset.
 * Responsibility:  Contain the assets of an explosion.
 */

import Explosion from "../Models/Explosion";

const Explosion01: Explosion = {
    explosionCenterFrame: [
        ["F", "0", "F", "0"],
        ["F", "F", "F", "F"],
        ["0", "F", "0", "F"],
    ],
    particleFrames: [
        [
            ["F"],
        ],
        [
            ["F", "F"]
        ],
    ],
    angles: [150, 180, 210, 330, 0, 30], // ul, l, ll, ur, r,
    particleFrameIndexes: [0, 1, 0, 0, 1, 0],
    speed: 20,
    acceleration: 1.05,
    explosionCenterDelay: 20,
    speeds: [], // not used, all particles travel at the same speed
    useSpeed: true,
};

export default Explosion01;
