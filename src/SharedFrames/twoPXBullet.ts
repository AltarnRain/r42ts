/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          2pxBullet
 * Responsibility:  Define a bullet 2 pixels wide. Variant color allows it to be any color.
 */

import { Frame } from "../Types/Types";
import { convertVariableFrameColor } from "../Utility/Frame";

export default function getTwoPixelBullet(color?: string): Frame {
    const twoPixelBullet: Frame = [
        ["V", "V"],
    ];

    if (color !== undefined) {
        convertVariableFrameColor(twoPixelBullet, color);
    }

    return twoPixelBullet;
}