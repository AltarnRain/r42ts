/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "./Explosion";
import GameLocation from "./GameLocation";

/**
 * Module:          Explosion Location
 * Responsibility:  Combines an explosion asset and a game location
 */

export default interface ExplosionLocation {
    /**
     * Explosion asset.
     */
    explosion: Explosion;

    /**
     * Location
     */
    location: GameLocation;
}