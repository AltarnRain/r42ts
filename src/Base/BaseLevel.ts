/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { drawLevelBanner } from "../GameScreen/LevelBanner";
import { drawBackground } from "../GameScreen/StaticRenders";
import GameLoop from "../Main/GameLoop";
import { appState, dispatch } from "../State/Store";
import { TickFunction } from "../Types/Types";
import { BaseEnemy } from "./BaseEnemy";

/**
 * Module:          BaseLevel
 * Responsibility:  Base class for all levels.
 */

export default abstract class BaseLevel {

    /**
     * Array of subscriptions registered in the GameLoop. Disposed when the level is disposed.
     */
    private subscriptions: Array<() => void> = [];

    /**
     * Array of enemies. These are the enemies that will appear in the Level.
     */
    protected enemies: BaseEnemy[] = [];

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

        // Register the background draw function so it runs in the game loop.
        this.registerSubscription(GameLoop.registerBackgroundDrawing(drawBackground));

        // Draw the level banned to show which round we're at.
        this.levelBannerSub = GameLoop.registerBackgroundDrawing(() => drawLevelBanner(gameState.level));
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
    protected begin(): void {
        // A phaser is rewarded at the beginning of a level.
        dispatch("addPhaser");

        // Register the stateManager so it can act on state changes in the level.
        this.registerSubscription(GameLoop.registerUpdateState(this.stateManager));
        window.setTimeout(() => {

            // Remove the level banner after one second.
            this.levelBannerSub();

            // Add the enemies to the global state. The registered stateManager will take it from here.
            dispatch<BaseEnemy[]>("setEnemies", this.enemies);

            // Add a function to the GameLoop that will check if a level has been won.
            this.registerSubscription(GameLoop.registerUpdateState(() => this.monitorLevelWonRun()));
        }, 1000);
    }

    /**
     * Disposes subscriptions
     */
    public dispose(): void {
        // The subscription array contains functions that remove themselves
        // from the GameLoop. Call all of them to remove them from the GameLoop.
        this.subscriptions.forEach((s) => s());
    }

    /**
     * This method uses the passed in monotorLeveLWon function to check if we can procede to the next level.
     */
    private  monitorLevelWonRun(): void {

        // Use the provided function to check if the level has been completed.
        if (this.monitorLevelWon()) {
            // Add a phaser because that's a level won reward.
            dispatch("addPhaser");

            // Move to the next level.
            dispatch("nextLevel");
        }
    }
}