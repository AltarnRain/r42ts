/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Frame } from "../Types/Frame";

/**
 * Module:          getCharacter
 * Responsibility:  Return a character
 */

/**
 * Get character
 * @param {Frame[]} frames. Character frames.
 * @param {string} character. Character frame to rturn.
 * @returns {Frame}. Character frame.
 */
export default function getCharacter(frames: Frame[], character: string): Frame {
    const upperCaseCharacter = character.toUpperCase();

    if (upperCaseCharacter === "SPACE") {
        return frames[character.length - 1];
    } else {
        const cc = upperCaseCharacter.charCodeAt(0) - 65;
        return frames[cc];
    }
}
