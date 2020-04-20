import BaseLevel from "../Base/BaseLevel";
import { appState, appStore } from "../State/Store";
import { levelFactory } from "./LevelFactory";

let level: number;
let currentLevel: BaseLevel | undefined;

export default function subscribeToLevelChange(): void {
    appStore().subscribe(() => {
        const { gameState } = appState();
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
    });
}