/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StartPositionProvider
 * Responsibility:  Provide start position to game objects.
 */

 /**
  * Returns a random position.
  * @param {number} limit. Limit of the position.
  * @param {size} size of the object.
  */
export function RandomStartPosition(limit: number, size: number): number {

    let randomStartPosition = Math.random() * limit;

    if (randomStartPosition + size > limit) {
        randomStartPosition = limit - size - 1;
    }

    return Math.round(randomStartPosition);
}
