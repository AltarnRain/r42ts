/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../../Base/BaseEnemyObject";
import BaseParticle from "../../Base/BaseParticle";
import GameLocation from "../../Models/GameLocation";
import ExplosionCenter from "../../Particles/ExplosionCenter";

/**
 * Module:          LevelState
 * Responsibility:  Holds the entire state of the game.
 */

export default interface LevelState {

    /**
     * Array of current game objects on screen.
     */
    enemies: BaseEnemyObject[];

    /**
     * Particles travelling on the screen.
     */
    particles: BaseParticle[];

    /**
     * Explosion centers on the screen.
     */
    explosionCenters: ExplosionCenter[];

    /**
     * Pause flag
     */
    pause: boolean;

    /**
     * Counts the number of register enemies.
     */
    totalNumberOfEnemies: number;

    phaserFrames: GameLocation[];
}
