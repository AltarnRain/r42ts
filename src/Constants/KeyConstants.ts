/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          PlayerConstants
 * Responsibility:  Constants used for the player.
 */

let gameControlKeysCache: string[];

export const GameControlKeys = {
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowRight: "ArrowRight",
    ArrowDown: "ArrowDown",
    Backspace: "Backspace",
    Space: "Space",
    F1: "F1",
    F2: "F2",
};

/**
 * Returns an array of all game control keys.
 */
const getGameControlKeys = (): string[] => {
    if (!gameControlKeysCache) {
        gameControlKeysCache = Object.keys(GameControlKeys);
    }

    return gameControlKeysCache;
};

export default getGameControlKeys;