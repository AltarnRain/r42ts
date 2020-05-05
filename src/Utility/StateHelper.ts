/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { IHitbox } from "../Interfaces/IHitbox";
import EnemyLevelState from "../State/EnemyLevel/EnemyLevelState";

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
export function getHittableObjects(levelState: EnemyLevelState): IHitbox[] {
    const ships = levelState.enemies.map((e) => e.ship);
    return [
        ...ships,
    ].filter((o) => o !== undefined);
}