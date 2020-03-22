
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          PlayerExplosion
 * Responsibility:  Explosion effect only for the player
 */

import { Explosion } from "../../Models/Explosion";

const PlayerExplosionAsset: Explosion = {
    frame: [
        ["0", "0", "2", "2", "0", "0"],
        ["4", "E", "0", "0", "E", "4"],
    ],
    particles: [
        [
            ["C", "C"], // red block
        ],
        [
            ["E", "C"], // yellow red block
        ],
        [
            ["C", "E"], // red yellow block
        ],
        [
            ["F", "C"], // white red block
        ],
        [
            ["C", "F"], // red white block
        ],
    ],
    particleFrames: [
        0, 0, 0, 0, 0,
        1, 1, 1, 1,
        2, 2, 2, 2,
        3, 3, 3, 3,
        4, 4, 4, 4,
        0, 0,
        0, 0,
    ],
    angles: [
        270, 270, 270, 270, 270, // five red block flying up.
        210, 210, 210, 210, // four yellow red blocks.
        330, 330, 330, 300, // four red yellow blocks.
        195, 195, 195, 195, // four white red blocks.
        345, 345, 345, 345, // four red yellow blocks.
        180, 180, // two red blocks
        0, 0 // two red blocks
    ],
    speeds: [
        3, 6, 9, 10, 11, // Speeds for the first angles.
        3, 6, 9, 10, // Speeds for the second row of angles.
        3, 6, 9, 10, // Speeds for the third row of angles.
        3, 6, 9, 10, // Speeds for the fourh row of angles.
        3, 6, 9, 10, // Speeds for the fith fow of angles
        5, 10, // Speeds for the fith fow of angles
        5, 10, // Speeds for the fith fow of angles
    ],
    acceleration: 1.05,
    explosionCenterDelay: 150,
    useSpeed: false,
    speed: 0, // not used.
};

export default PlayerExplosionAsset;