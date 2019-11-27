/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Player
 * Responsibility:  Defines raster images (with color). For the player ship and bullet.
 */

const PlayerAsset = {
    ship: [
        ["0", "0", "B", "B", "0", "0"],
        ["A", "B", "F", "F", "B", "A"],
        ["B", "F", "0", "0", "F", "B"],
    ],
    bullet: [
        ["E", "E"]
    ],
    speed: 10,
    width: 6,
    height: 3,
    bulletSpeed: 30,
};

export default PlayerAsset;
