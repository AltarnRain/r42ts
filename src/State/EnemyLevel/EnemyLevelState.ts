/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { GameLocation } from "../../Models/GameLocation";
import ExplosionCenter from "../../Particles/ExplosionCenter";
import Particle from "../../Particles/Particle";
import { Enemy } from "./Enemy";

/**
 * Module:          EnemyLevelState
 * Responsibility:  Holds the entire state of the game.
 */

export default interface EnemyLevelState {

    /**
     * Array of current game objects on screen.
     */
    enemies: Enemy[];

    /**
     * Particles travelling on the screen.
     */
    particles: Particle[];

    /**
     * Explosion centers on the screen.
     */
    explosionCenters: ExplosionCenter[];

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
}
