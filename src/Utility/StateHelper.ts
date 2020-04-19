/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseGameObject from "../Base/BaseGameObject";
import { appState } from "../State/Store";

/**
 * Module:          StateHelper
 * Responsibility:  Providers quality of life functions that pull data from the state of combine's dispatches.
 */

/**
 * Returns all gameobject that can kill the player with their hitboxes.
 * @returns {BaseGameObject[]}. An array of objects that can be hit by the player or hit the player.
 */
export function getHittableObjects(): BaseGameObject[] {
    const { levelState } = appState();
    return [
        ...levelState.enemies,
        ...levelState.particles,
        ...levelState.explosionCenters
    ].filter((o) => o !== undefined);
}