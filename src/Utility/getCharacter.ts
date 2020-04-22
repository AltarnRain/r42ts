/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          getCharacter
 * Responsibility:  Return a character
 */

import { Frame, Frames } from "../Types/Types";

export default function getCharacter(frames: Frames, character: string): Frame {
    const upperCaseCharacter = character.toUpperCase();

    if (upperCaseCharacter === "SPACE") {
        return frames[character.length - 1];
    } else {
        const cc = upperCaseCharacter.charCodeAt(0) - 65;
        return frames[cc];
    }
}
