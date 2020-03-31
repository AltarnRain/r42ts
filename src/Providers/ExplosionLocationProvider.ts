/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import ExplosionLocation from "../Models/ExplosionLocation";
import GameLocation from "../Models/GameLocation";

/**
 * Module:          ExplosionLocationProvider
 * Responsibility:  Provide an explosion location
 */

export default function explosionLocationProvider(obj: BaseGameObject): ExplosionLocation {
    return {
        location : obj.getLocation(),
        explosion: obj.getExplosion(),
    };
}