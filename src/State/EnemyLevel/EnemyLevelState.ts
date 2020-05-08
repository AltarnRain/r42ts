/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../../Models/GameLocation";
import { ParticleState } from "../Player/ParticleState";
import { EnemyState } from "./EnemyState";
import { ExplosionCenterState } from "./ExplosionCenterState";

/**
 * Module:          EnemyLevelState
 * Responsibility:  Holds the entire state of the game.
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
     * Fire interval
     */
    fireInterval: number;

    /**
     * Current state of explosions.
     */
    explosionCenters: ExplosionCenterState[];

    /**
     * State of the current enemies.
     */
    enemies: EnemyState[];
}
