/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Explosion from "../../Models/Explosion";
import { GameLocation } from "../../Models/GameLocation";
import { GameRectangle } from "../../Models/GameRectangle";
import { Frame } from "../../Types/Frame";

/**
 * Module:          EnemyState
 * Responsibility:  Defines the state for a single enemy.
 */

export interface EnemyState {
    /**
     * The id of the enemy. Used to correlate a BaseEnemy object and state. Also used to identify changes
     * To specific enemies.
     */
    enemyId: number;

    /**
     * Colored explosion. The explosion of the enemy if its destroyed with colors so it can be rendered immedately.
     */
    coloredExplosion: Explosion;

    /**
     * 'Left' location of the enemy. This value is offset to accomodate differences between frames.
     */
    offsetLeft: number;

    /**
     * 'Top' location. Also offset to accomodate differences between frames.
     */
    offsetTop: number;

    /**
     * The current frame. Can be undefined and if it is, it is not rendered.
     */
    currentFrame?: Frame;

    /**
     * Remaining hitpoints of the enemy.
     */
    hitpoints: number;

    /**
     * Recangle where the enemy is seen by the game. Used for hitdetetion.
     */
    hitbox: GameRectangle;

    /**
     * The middle location of the enemy.
     */
    centerLocation?: GameLocation;

    /**
     * Point awared to the player when an enemy is destroyed.
     */
    points: number;

    /**
     * Last game tick when the enemy fired. Used to prevent enemies from spewing out all their bullets in one go.
     */
    lastFiretick?: number;

    /**
     * Index of the current frame. Used by ShipsToFire provides to check if the ucrrent frame index is eligable to fire bullets.
     */
    currentFrameIndex?: number;

    /**
     * Location where the bullets fired by an enemy will initially appear on screen.
     */
    nozzleLocation?: GameLocation;
}