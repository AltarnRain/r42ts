
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../../Constants/Angles";
import Explosion from "../../Models/Explosion";

/**
 * Module:          Bat explosion.
 */

export default function getBatExplosiom(): Explosion {
    const explosion: Explosion = {
        explosionCenterFrame: [["0"]],
        particleFrames: [
            [
                ["0", "0", "V", "V", "V", "0", "0"],
                ["0", "V", "0", "0", "0", "V", "0"],
                ["V", "0", "0", "0", "0", "0", "V"],
            ],
        ],
        angles: [angles.up],
        particleFrameIndexes: [0],
        speed: 10,
        acceleration: 1.00,
        explosionCenterDelay: 0,
        speeds: [], // not used, all particles travel at the same speed
        useSpeed: true,
    };

    return explosion;
}
