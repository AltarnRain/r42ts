/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Hitbox
 * Responsibility:  Defins a hitbox.
 */

import GameLocation from "./GameLocation";

/**
 * Model for a hitbox.
 */
export interface Hitbox {
    /**
     * Radius of the hitbox.
     */
    radius: number;

    /**
     * Location of the hitbox.
     */
    location: GameLocation;
}
