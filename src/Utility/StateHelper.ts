/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { IHitbox } from "../Interfaces/IHitbox";
import { Enemy } from "../State/EnemyLevel/Enemy";

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
export function getHittableObjects(enemies: Enemy[]): IHitbox[] {
    const ships = enemies.map((e) => e.ship);
    return [
        ...ships,
    ];
}