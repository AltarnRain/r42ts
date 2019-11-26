
/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Bird enemy
 * Responsibility:  Define animation frames for the bird enemy.
 */
import CGAColors from "../../Constants/CGAColors";
import Asset from "../../Interfaces/Asset";

const BirdAsset: Asset = {
    frames: [
        [
            ["0", "V", "0", "V", "0"],
            ["V", "0", "V", "0", "V"],
            ["V", "0", "0", "0", "V"],
        ],
        [
            ["0", "V", "V", "0", "V", "V", "0"],
            ["V", "0", "0", "V", "0", "0", "V"],
        ],
        [
            ["V", "V", "V", "0", "V", "V", "V"],
            ["0", "0", "0", "V", "0", "0", "0"],
        ],
        [
            ["V", "0", "0", "0", "0", "0", "V"],
            ["0", "V", "V", "0", "V", "V", "0"],
            ["0", "0", "0", "V", "0", "0", "0"],
        ]
    ],
    yOffsets: [0, 0, 0, -1],
    xOffsets: [1, 0, 0, 0],
    colors: [CGAColors.lightMagenta, CGAColors.yellow, CGAColors.lightCyan, CGAColors.lightRed],
    variesInColor: true,
    startingAngles: [2, 358, 178, 182],
    speed: 5,
    maxWidth: 7,
    maxHeight: 3,
    animationFrequency: 200,
    changeColor: true,
    changeColorFrequency: 200,
};

export default BirdAsset;
