
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from "../../Constants/Angles";
import Explosion from "../../Models/Explosion";

/**
 * Module:          Fish explosion.
 */

export default function getFishExplosiom(): Explosion {
    const explosion: Explosion = {
        explosionCenterFrame: [["0"]],
        particleFrames: [
            [
                ["B", "B"],
                ["0", "0"],
                ["4", "4"],
                ["0", "0"],
                ["D", "D"],
                ["0", "0"],
                ["D", "D"],
                ["0", "0"],
                ["4", "4"],
            ],
            [
                ["A", "A"],
                ["0", "0"],
                ["7", "7"],
                ["0", "0"],
                ["E", "E"],
                ["0", "0"],
                ["E", "E"],
                ["0", "0"],
                ["7", "7"],
                ["0", "0"],
                ["A", "A"],
            ],
        ],
        angles: [angles.left, angles.right],
        particleFrameIndexes: [0, 1],
        speed: 10,
        acceleration: 1.00,
        explosionCenterDelay: 0,
        speeds: [], // not used, all particles travel at the same speed
        useSpeed: true,
    };

    return explosion;
}
