
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          Explosion03.
 */

export default function getExplosion03(): Explosion {
    const explosion: Explosion = {
        explosionCenterFrame: [
            ["E", "A", "A", "E"],
            ["E", "E", "E", "E"],
            ["E", "A", "A", "E"],
        ],
        particleFrames: [
            [
                ["E", "A"],
            ],
            [
                ["E", "E"]
            ],
            [
                ["A", "E"],
            ],
        ],
        angles: [160, 180, 200, 340, 0, 20],
        particleFrameIndexes: [0, 1, 0, 2, 1, 2],
        speed: 17,
        acceleration: 1.05,
        explosionCenterDelay: 50,
        speeds: [], // not used, all particles travel at the same speed
        useSpeed: true,
    };

    return explosion;
}
