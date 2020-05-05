/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BulletRunner from "../BulletProviders/BulletRunner";
import GameLoop from "../GameLoop";
import { drawLevelBanner } from "../GameScreen/LevelBanner";
import { drawBackground } from "../GameScreen/StaticRenders";
import Guard from "../Guard";
import ILevel from "../Interfaces/ILevel";
import { resetLevelState, setEnemies, setFireInterval } from "../State/EnemyLevel/Actions";
import { addPhaser, nextLevel } from "../State/Game/Actions";
import { setPlayerMovementLimit } from "../State/Player/Actions";
import { appState, appStore, dispatch } from "../State/Store";
import { TickFunction } from "../Types";
import { BaseEnemy } from "./BaseEnemy";

export default abstract class BaseEnemyLevel implements ILevel {

    /**
     * Array of subscriptions registered in the GameLoop. Disposed when the level is disposed.
     */
    private subscriptions: Array<() => void> = [];

    /**
     * Subscription that removes the level banner from the game loop when called. Defined in the 'start' method.
     */
    protected levelBannerSub!: () => void;

    /**
     * A function that will handle this level's state.
     */
    protected stateManager: TickFunction;

    /**
     * Function passed from the outside that checks if a level is won.
     */
    private monitorLevelWon: () => boolean;

    /**
     * Subscribe to the store and dispatch the level appropriate movement restriction to the player
     * When the player is alive and their movement limit is not set to None.
     */
    private storeSub = appStore().subscribe(() => {
        const { playerState } = appState();

        if (playerState.playerOnScreen && playerState.moveLimit !== "none") {
            dispatch(setPlayerMovementLimit("none"));
        }
    });

    /**
     * Constructs the base level
     * @param {TickFunction} stateManager. A function that will handle the state for the level.
     * @param {() => boolean} monitorLevelWon. A function that checks fort he win condition of a level.
     */
    constructor(stateManager: TickFunction, monitorLevelWon: () => boolean) {
        this.stateManager = stateManager;
        this.monitorLevelWon = monitorLevelWon;
    }

    /**
     * Start the level
     */
    public start(): void {
        const { gameState } = appState();

        dispatch(setPlayerMovementLimit("immobile"));

        // Register the background draw function so it runs in the game loop.
        this.registerSubscription(GameLoop.registerBackgroundDrawing(drawBackground));

        // Draw the level banner to show which round we're at.
        let level = 0;
        if (gameState.level !== undefined) {
            level = gameState.level;
        }

        this.levelBannerSub = GameLoop.registerBackgroundDrawing(() => drawLevelBanner(level));
    }

    /**
     * Register subscriptions.
     * @param {function} f.
     */
    protected registerSubscription(f: () => void) {
        this.subscriptions.push(f);
    }

    /**
     * Begin this level. Call from start.
     */
    protected begin(enemies: BaseEnemy[], fireInterval?: number, bulletRunner?: BulletRunner): void {
        // Register the stateManager so it can act on state changes in the level.
        this.registerSubscription(GameLoop.registerUpdateState(this.stateManager));

        if (bulletRunner !== undefined) {
            this.registerSubscription(GameLoop.registerUpdateState((tick) => bulletRunner.getBullets(tick)));
        }

        window.setTimeout(() => {

            // Remove the level banner after one second.
            this.levelBannerSub();

            // Set the fire interval of enemies in the current state
            if (fireInterval !== undefined) {
                dispatch(setFireInterval(fireInterval));
            }

            // Add the enemies to the global state. The registered stateManager will take it from here.
            dispatch(setEnemies(enemies));

            // Add a function to the GameLoop that will check if a level has been won.
            this.registerSubscription(GameLoop.registerUpdateState(() => this.monitorLevelWonRun()));

            dispatch(setPlayerMovementLimit("none"));
        }, 1000);
    }

    /**
     * Disposes subscriptions
     */
    public dispose(): void {
        dispatch(resetLevelState());
        // The subscription array contains functions that remove themselves
        // from the GameLoop. Call all of them to remove them from the GameLoop.
        this.subscriptions.forEach((s) => s());
        this.storeSub();
    }

    /**
     * This method uses the passed in monotorLeveLWon function to check if we can procede to the next level.
     */
    private monitorLevelWonRun(): void {

        // Use the provided function to check if the level has been completed.
        if (this.monitorLevelWon()) {
            // Add a phaser because that's a level won reward.
            dispatch(addPhaser());

            // Move to the next level.
            dispatch(nextLevel());
        }
    }
}