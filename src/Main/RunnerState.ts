/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import BaseParticle from "../Base/BaseParticle";
import ExplosionCenter from "../Particles/ExplosionCenter";
import Player from "../Player/Player";
import PlayerBullet from "../Player/PlayerBullet";

/**
 * Module:          RunnerState
 * Responsibility:  State of the runner
 */

export interface RunnerState {
    /**
     * Array of current game objects on screen.
     */

    enemies: BaseEnemyObject[];

    /**
     * Reference to the player object.
     */
    player: Player | undefined;

    /**
     * Quick reference to the player bullet.
     */
    playerBullet: PlayerBullet | undefined;

    /**
     * Particles travelling on the screen.
     */
    particles: BaseParticle[];

    /**
     * Explosion centers on the screen.
     */
    explosionCenters: ExplosionCenter[];

    /**
     * Flag to track if the phaser is beam is currently being fired.
     */
    phaserOnScreen: boolean;

    /**
     * Pause flag
     */
    pause: boolean;

    /**
     * Draw handle
     */
    drawHandle: number | undefined;

    /**
     * Counts the number of register enemies.
     */
    numberOfEnemies: number;

    /**
     * Flag if the player's ship is forming after death.
     */
    playerFormationPhase: "begin" | "inprogress" | undefined;

    /**
     * Debugging options.
     */
    debugging: {
        drawHitboxes: boolean;
        playerIsImmortal: boolean;
        renderPhaser: boolean;
    };
}