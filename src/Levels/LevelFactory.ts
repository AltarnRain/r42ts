import BaseLevel from "../Base/BaseLevel";
import enemeyLevelRunner from "../Main/EnemeyLevelRunner";
import { appState } from "../State/Store";
import Level00 from "./Level00";
import Level01 from "./Level01";
import Level02 from "./Level02";

export function levelFactory(level: number): BaseLevel | undefined {
    switch (level) {
        case 0:
            // Test level
            return new Level00(enemeyLevelRunner, never);
        case 1:
            return new Level01(enemeyLevelRunner, clearedEnemies);
        case 2:
            return new Level02(enemeyLevelRunner, clearedEnemies);
    }
}

function clearedEnemies(): boolean {
    const { levelState } = appState();
    if (levelState.enemies.length === 0 && levelState.particles.length === 0) {
        return true;
    }

    return false;
}

/**
 * Used for debugging in level 00.
 */
function never(): boolean {
    return false;
}