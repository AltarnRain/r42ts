/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLoop from "../GameLoop";
import drawLevelBanner from "../GameScreen/LevelBanner";
import { drawBackground } from "../GameScreen/StaticRenders";
import ILevel from "../Interfaces/ILevel";
import enemyLevelContentFactory from "../Providers/EnemyLevelContentProvider";
import EnemyLevelRunner from "../Runners/EnemyLevelRunner";
import { resetLevelState } from "../State/EnemyLevel/EnemyLevelActions";
import { setPlayerMovementLimit } from "../State/Player/PlayerActions";
import { appState, dispatch } from "../State/Store";
import handleLevelWon from "../StateHandlers/HandleLevelWon";
import { Enemies } from "../Types";
import { SoundPlayer } from "../Sound/SoundPlayer";

export default class EnemyLevel implements ILevel {

    /**
     * Array of subscriptions registered in the GameLoop. Disposed when the level is disposed.
     */
    private subscriptions: Array<() => void> = [];

    /**
     * Enemies of the level.
     */
    private enemies: Enemies;

    private currentEnemyCount: number | undefined;

    /**
     * Constructs the base level
     * @param {TickFunction} stateManager. A function that will handle the state for the level.
     * @param {() => boolean} monitorLevelWon. A function that checks fort he win condition of a level.
     */
    constructor(enemy: Enemies) {
        this.enemies = enemy;
    }

    /**
     * Register subscriptions.
     * @param {function} f.
     */
    protected registerSubscription(f: () => void) {
        this.subscriptions.push(f);
    }

    /**
     * Begin this level.
     * @param {() => void} levelReady. Optional callback that is called when the level is ready to begin.
     */
    public begin(levelReady?: () => void): Promise<void> {
        return new Promise((resolve) => {
            const { enemies, bulletRunner } = enemyLevelContentFactory(this.enemies);

            const {
                gameState
            } = appState();

            dispatch(setPlayerMovementLimit("immobile"));

            // Register the background draw function so it runs in the game loop.
            this.registerSubscription(GameLoop.registerBackgroundDrawing(drawBackground));

            // Draw the level banner to show which round we're at.
            let level = 0;
            if (gameState.level !== undefined) {
                level = gameState.level;
            }

            // Draw the level banner, then start the level.
            drawLevelBanner(level, () => {
                // Register the stateManager so it can act on state changes in the level.
                this.registerSubscription(GameLoop.registerUpdateState(EnemyLevelRunner.run));

                if (bulletRunner !== undefined) {
                    this.registerSubscription(GameLoop.registerUpdateState((tick) => bulletRunner.updateState(tick)));
                }

                // Add the enemies to the enemy level runner. The registered stateManager will take it from here.
                EnemyLevelRunner.setEnemies(enemies);

                // Add a function to the GameLoop that will check if a level has been won.
                this.registerSubscription(GameLoop.registerLevelWonMonitor(() => this.monitorLevelWonRun()));

                // Register back ground sound monitor.
                this.registerSubscription(GameLoop.registerBackgroundSoundMonitor(() => this.playbackgroundSound()));

                dispatch(setPlayerMovementLimit("none"));

                if (levelReady !== undefined) {
                    levelReady();
                }

                resolve();
            });
        });
    }

    /**
     * Disposes subscriptions
     */
    public dispose(): void {

        // Remove remaining enemies from the enemy level runner so they do not get
        // a chance to push their state to redux.
        EnemyLevelRunner.setEnemies([]);

        // Reset is required for levels where there is a time limit on the level and the
        // player does clear the state by destroying enemies.
        dispatch(resetLevelState());

        // The subscription array contains functions that remove themselves
        // from the GameLoop. Call all of them to remove them from the GameLoop.
        this.subscriptions.forEach((s) => s());
        this.subscriptions = [];

        SoundPlayer.stopBackgroundPlaying();
    }

    /**
     * This method uses the passed in monotorLeveLWon function to check if we can procede to the next level.
     */
    protected monitorLevelWonRun(): void {

        // Use the provided function to check if the level has been completed.
        if (this.levelClear()) {
            handleLevelWon();
        }
    }

    /**
     * Functions that checks if the level is completely clear.
     * @returns {boolean}. True if the enemies and shrapnell is gone.
     */
    private levelClear(): boolean {
        const { enemyLevelState: { enemies, shrapnells } } = appState();
        if (enemies.length === 0 && shrapnells.length === 0) {
            return true;
        }

        return false;
    }

    /**
     * Play background sound playing.
     */
    private playbackgroundSound(): void {
        const {
            enemyLevelState: { enemies }
        } = appState();

        if (this.currentEnemyCount === undefined) {
            SoundPlayer.playEnemyBackgroundSound(this.enemies, enemies.length - 1) ;
            this.currentEnemyCount = enemies.length;
        } else if (this.currentEnemyCount !== enemies.length) {
            SoundPlayer.stopBackgroundPlaying();
            SoundPlayer.playEnemyBackgroundSound(this.enemies, this.currentEnemyCount - 1);
            this.currentEnemyCount = enemies.length;
        }
    }
}