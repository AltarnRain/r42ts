/**
 * @preserve Copyright 2010-2019 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          PlayerExplosion
 * Responsibility:  Define the player explosion. The player explosion is quite different than for enemies, it's MUCH bigger and involves many particles
 *                  flying at several speeds and angles.
 */

import { Explosion } from "./Explosion";

export default interface PlayerExplosion extends Explosion {
    /**
     * Speeds. Set the speed for each particle.
     */
    speeds: number[];
}
