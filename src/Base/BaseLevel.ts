/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { drawLevelBanner } from "../GameScreen/LevelBanner";
import { drawBackground } from "../GameScreen/StaticRenders";
import { GameLoop } from "../Modules";
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
    }

    /**
     * Start the level
     */
    public start(): void {
        const { gameState } = appState();
        this.registerSubscription(GameLoop.registerStatic(drawBackground));
        this.levelBannerSub = GameLoop.registerStatic(() => drawLevelBanner(gameState.level));

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
            dispatch<boolean>("levelRunning", true);
        }, 1000);
    }

    /**
     * Disposes subscriptions
     */
    public dispose(): void {
        this.subscriptions.forEach((s) => s());
        dispatch<boolean>("levelRunning", false);
    }
}

export default BaseLevel;