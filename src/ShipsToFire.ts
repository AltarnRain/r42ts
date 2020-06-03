/**
 * @preserve Copyright 2010-2020s Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { EnemyState } from "./State/EnemyLevel/EnemyState";
import { Angle } from "./Types/Angle";

/**
 * Module:          ShipsToFire
 * Responsibility:  A model with ships that will fire and their angle.
 */

export default interface ShipToFire {
    enemy: EnemyState;
    angle: Angle;
}
