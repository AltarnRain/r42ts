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
import { BaseEnemyObject } from "./BaseEnemyObject";

/**
 * Module:          BaseLevel
 * Responsibility:  Base class for all levels.
 */

abstract class BaseLevel {

    /**
     * Array of subscriptions
     */
    private subscriptions: Array<() => void> = [];

    /**
     * Array of enemies.
     */
    protected enemies: BaseEnemyObject[] = [];

    /**
     * Subscription that removes the level banner from the game loop when called.
     */
    protected levelBannerSub!: () => void;

    /**
     * A function that will handle this level's state.
     */
    protected stateManager: TickFunction;

    /**
     * Constructs the base level
     * @param {TickFunction} stateManager. A function that will handle the state for the level.
     */
    constructor(stateManager: TickFunction) {
        this.stateManager = stateManager;

        // bind to this. Monitors are executed from a different execution context.
        this.monitorLevelWon = this.monitorLevelWon.bind(this);
    }

    /**
     * Start the level
     */
    public start(): void {
        const { gameState } = appState();
        this.registerSubscription(GameLoop.registerBackgroundDrawing(drawBackground));
        this.levelBannerSub = GameLoop.registerBackgroundDrawing(() => drawLevelBanner(gameState.level));

        dispatch<boolean>("showingLevelBanner", true);
    }

    /**
     * Register subscriptions
     * @param {function} f.
     */
    protected registerSubscription(f: () => void) {
        this.subscriptions.push(f);
    }

    /**
     * Begin this level. Call from start.
     */
    protected begin(): void {
        this.registerSubscription(GameLoop.registerUpdateState(this.stateManager));
        window.setTimeout(() => {
            this.levelBannerSub();
            dispatch<boolean>("showingLevelBanner", false);
            dispatch<BaseEnemyObject[]>("setEnemies", this.enemies);
            this.registerSubscription(GameLoop.registerUpdateState(this.monitorLevelWon));
        }, 1000);
    }

    /**
     * Disposes subscriptions
     */
    public dispose(): void {
        this.subscriptions.forEach((s) => s());
    }

    /**
     * Returns true if all the enemies are cleared. Can be used for QoL in monitorLevelWon.
     */
    protected clearedEnemies(): boolean {
        const { levelState} = appState();
        return levelState?.enemies.length === 0 && levelState?.particles.length === 0;
    }

    /**
     * Monitors if the level is won. By default it checks if the level is clear of ememies.
     */
    public monitorLevelWon(): void {
        if (this.clearedEnemies()) {
            dispatch("nextLevel");
        }
    }
}

export default BaseLevel;