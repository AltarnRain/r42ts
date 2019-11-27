/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Levels
 * Responsibility:  Define the levels of the game.
 */

import Dictionary from "../../Models/Dictionary";
import Level from "../../Types/Level";

const Levels: Dictionary<Level> = {
    level1: {
        enemy: "Bird",
        numberOfEnemies: 20,
    }
};

export default Levels;