/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          LevelState
 * Responsibility:  Stores state of the current level.
 */

import GameLocation from "../../Interfaces/GameLocation";
import { Enemy } from "./Enemy";

export default interface LevelState {
    playerLocation: GameLocation;

    enemies: Enemy[];
}