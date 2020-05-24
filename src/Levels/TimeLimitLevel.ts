/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLoop from "../GameLoop";
import enemyFactory from "../Providers/EnemyFactory";
import EnemyLevelRunner from "../Runners/EnemyLevelRunner";
import { appState } from "../State/Store";
import handleLevelWon from "../StateHandlers/HandleLevelWon";
import EnemyLevel from "./EnemyLevel";
import { SoundPlayer } from "../Sound/SoundPlayer";

/**
 * Module:          TimeLimitLevel
 * Responsibility:  Level with asteroids
 */

export class TimeLimitLevel extends EnemyLevel {

    /**
     * When true the time is up and the level is won.
     */
    private timeUp = false;

    /**
     * Used to keep track of the number of ticks that have passed.
     */
    private tickCount: number = 0;

    /**
     * Handle for the window.setInterval.
     */
    private intervalHandle: number | undefined;

    public begin(): Promise<void> {

        // Use the optional callback to register handleRespawn when the level is ready to begin.
        return super.begin().then(() => {

            this.registerSubscription(GameLoop.registerUpdateState(() => this.handleRespawn()));

            // After 20 seconds the player wins.
            this.intervalHandle = window.setInterval(() => {
                const {
                    gameState: { pause, timeLevelTimeLimit }
                } = appState();

                // Do not increase the tick count if the game is paused, otherwise you
                // can win this level simply by pausing the game.
                if (!pause) {
                    this.tickCount += 1000;
                }

                if (this.tickCount >= timeLevelTimeLimit) {
                    this.timeUp = true;
                }

                // the interval will run every second this is more accurate than using milliseconds.
            }, 1000);
        });
    }

    /**
     * Runs in the game loop and creates a new enemy if the number of enemies falls below 8.
     */
    public handleRespawn(): void {
        const {
            enemyLevelState: { enemies }
        } = appState();

        if (enemies.length < 8) {
            const newEnemy = enemyFactory(this.enemy);
            EnemyLevelRunner.addEnemy(newEnemy);
        }
    }

    /**
     * Override from EnemyLevel.
     */
    protected monitorLevelWonRun(): void {
        const {
            playerState: { alive }
        } = appState();

        // It is possible to skip these levels when you die and
        // stop your formation, however, like the original game
        // you have to complete your formation before the level
        // will finish.
        if (this.timeUp && alive) {
            handleLevelWon();
        }
    }

    /**
     * Dispose the level
     */
    public dispose(): void {
        super.dispose();

        SoundPlayer.stopFalling();

        if (this.intervalHandle !== undefined) {
            window.clearInterval(this.intervalHandle);
        }
    }
}