/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLocation from "../../Models/GameLocation";
import { ParticleState } from "../ParticleState";
import { EnemyState } from "./EnemyState";
import { ExplosionCenterState } from "./ExplosionCenterState";

/**
 * Module:          EnemyLevelState
 * Responsibility:  Holds the state for levels that contain enemies.
 */

export default interface EnemyLevelState {
    /**
     * Enemy bullets.
     */
    bullets: ParticleState[];

    /**
     * Shrapnell particles.
     */
    shrapnells: ParticleState[];

    /**
     * Counts the number of register enemies.
     */
    totalNumberOfEnemies: number;

    /**
     * Phaser locations.
     */
    phaserLocations: GameLocation[];

    /**
     * Current state of explosions.
     */
    explosionCenters: ExplosionCenterState[];

    /**
     * State of the current enemies.
     */
    enemies: EnemyState[];
}
