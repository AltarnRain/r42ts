/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { EnemyState } from "../State/EnemyLevel/EnemyState";
import { appState } from "../State/Store";

/**
 * Module:          GetShipsReadyToFire
 * Responsibility:  Returns ships whose last fire tick time permits them to fire now.
 */

export function GetShipsReadyToFire(tick: number): EnemyState[] {
    const {
        enemyLevelState: { enemies }
    } = appState();

    return enemies.filter((enemy) => enemy.lastFiretick === undefined || enemy.lastFiretick + 50 < tick);
}
