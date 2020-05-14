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
import { Enemies } from "../Types";
import EnemyLevel from "./EnemyLevel";

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
     * current enemy of the level.
     */
    private enemy: Enemies;

    constructor(enemy: Enemies) {
        super(enemy);

        this.enemy = enemy;
    }

    public begin(): void {

        // Use the optional callback to register handleRespawn when the level is ready to begin.
        super.begin(() => {
            this.registerSubscription(GameLoop.registerUpdateState(() => this.handleRespawn()));

            // After 20 seconds the player wins.
            window.setTimeout(() => {
                this.timeUp = true;
            }, 20000);
        });
    }

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

    public dispose(): void {
        super.dispose();
    }
}