
/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../Models/Explosion";
import Mutators from "../Utility/FrameMutators";

/**
 * Module:          Explosion01.
 */

export default function getExplosion01(centerColor?: string, shrapnellColor?: string): Explosion {
    const explosion01: Explosion = {
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
        speed: 17,
        acceleration: 1.05,
        explosionCenterDelay: 30,
        speeds: [], // not used, all particles travel at the same speed
        useSpeed: true,
    };

    if (centerColor) {
        Mutators.Frame.setColor(explosion01.explosionCenterFrame, centerColor);
    }

    if (shrapnellColor) {
        Mutators.Frames.setColor(explosion01.particleFrames, shrapnellColor);
    }

    return explosion01;
}
