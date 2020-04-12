/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import ExplosionCenter from "../Particles/ExplosionCenter";
import Particle from "../Particles/Particle";
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
     * Animation frame handler.
     */
    gameLoopHandle: number;

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
    generalParticles: Particle[];

    /**
     * Keep track of the player's ship particles seperately so we can track when all the
     * Ship's particles have moved out of the screen when the player dies.
     */
    playerShipParticles: Particle[];

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
     * Debugging options.
     */
    debugging: {
        drawHitboxes: boolean;
        playerIsImmortal: boolean;
        renderPhaser: boolean;
    };

    /**
     * Call back function to take action outside the runner that the player's been destroyed.
     */
    onPlayerDestroyed(): void;
}