/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseDestructableObject } from "../Base/BaseDestructableObject";
import ExplosionLocation from "../Models/ExplosionLocation";

/**
 * Module:          ExplosionLocationProvider
 * Responsibility:  Provide an explosion location
 */

export default function explosionLocationProvider(obj: BaseDestructableObject): ExplosionLocation {
    return {
        location : obj.getLocation(),
        explosion: obj.getExplosion(),
    };
}