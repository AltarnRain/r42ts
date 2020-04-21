import BaseLevel from "../Base/BaseLevel";
import { appState, appStore, dispatch } from "../State/Store";
import { levelFactory } from "./LevelFactory";

// Used to track changes in level
let level: number;
let currentLevel: BaseLevel | undefined;

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
        if (level !== gameState.level) {
            level = gameState.level;

            if (currentLevel) {
                currentLevel.dispose();
            }

            // Get new level
            currentLevel = levelFactory(level);

            if (currentLevel !== undefined) {
                currentLevel.start();
            }
        }

        if (gameState.score - currentScore >= 7500) {
            // Each 7500 points the player is given an extra life and phaser. This
            // can be done in a single dispatch.
            currentScore = gameState.score;
            dispatch("addLifeAndPhaser");
        }
    });
}