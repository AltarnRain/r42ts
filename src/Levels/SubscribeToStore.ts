/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          SubscribeToStore
 * Responsibility:  Creates a Redux Store subscription that monitors state changes
 *                  that trigger a state action.
 */

import ILevel from "../Interfaces/ILevel";
import { addLifeAndPhaser } from "../State/Game/GameActions";
import { appState, appStore, dispatch } from "../State/Store";
import { levelFactory } from "./LevelFactory";

// Used to track changes in level
let levelNumber: number;

// Current level object.
let currentLevel: ILevel | undefined;

// Used to track changes in score to award ships and phasers.
let currentScore = 0;

/**
 * Lazy load a subscription to the redux store.
 */
export default function subscribeToStoreChanges(): void {

    // We'll monitor changes in the state on which we ant to act.
    appStore().subscribe(() => {
        const { gameState } = appState();

        // Handle level change acting on a change in level.
        if (gameState.level !== undefined && levelNumber !== gameState.level) {
            levelNumber = gameState.level;

            if (currentLevel !== undefined) {
                currentLevel.dispose();
            }

            // Get new level
            currentLevel = levelFactory(levelNumber);

            if (currentLevel !== undefined) {
                currentLevel.begin();
            }
        }

        if (gameState.score - currentScore >= 7500) {
            // Each 7500 points the player is given an extra life and phaser. This
            // can be done in a single dispatch.
            currentScore = gameState.score;
            dispatch(addLifeAndPhaser());
        }
    });
}