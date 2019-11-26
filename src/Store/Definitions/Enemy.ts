/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Enemy
 * Responsibility:  Defines an enemy
 */

import { Asset } from "../../Interfaces/Asset";
import GameLocation from "../../Interfaces/GameLocation";

export interface Enemy extends Asset {
    /**
     * Defines the location of the enemy.
     */
    location: GameLocation;
}
