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
import { levelFactory } from "../Levels/LevelFactory";
import { addLifeAndPhaser } from "../State/Game/GameActions";
import { appState, dispatch } from "../State/Store";

// Used to track changes in level
let levelNumber: number | undefined;

// Current level object.
let currentLevel: ILevel | undefined;

// When true a level is loading.
let levelLoading = false;

// Amount of points when a life and level is awarded.
const awardLifeAndLevelPoints = 7000;

/**
 * Lazy load a subscription to the redux store.
 */

export default function levelProgressionRunner() {
    const { gameState } = appState();

    // Handle level change acting on a change in level but only if no current level is loading.
    if (levelNumber !== gameState.level && levelLoading === false) {
        // Level transition.
        levelLoading = true;

        // New level. Assign level number
        levelNumber = gameState.level;

        // Dispose of previous level
        if (currentLevel !== undefined) {
            currentLevel.dispose();
        }

        // Get new level
        currentLevel = levelFactory(gameState.level);
        currentLevel.begin().then(() => {
            // Level loading is async due to the delayed level banner so we'll use a promise
            // to reset the level loading flag.
            levelLoading = false;
        });
    }

    if (gameState.score - gameState.lastAwardScore >= awardLifeAndLevelPoints) {
        dispatch(addLifeAndPhaser());
    }
}

/**
 * Reset the level progression. Used when the game is over.
 */
export function resetLevelProgression(): void {
    levelNumber = undefined;
    if (currentLevel !== undefined) {
        currentLevel.dispose();
    }
}