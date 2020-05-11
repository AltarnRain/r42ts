/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import GameLoop from "../GameLoop";
import enemyFactory from "../Providers/EnemyFactory";
import EnemyLevelRunner from "../Runners/EnemyLevelRunner";
import { appState } from "../State/Store";
import EnemyLevel from "./EnemyLevel";

/**
 * Module:          AsteroidLevel
 * Responsibility:  Level with asteroids
 */

export class AsteroidLevel extends EnemyLevel {

    public begin(): void {

        // Use the optional callback to register handleRespawn when the level is ready to begin.
        super.begin(() =>{
            GameLoop.registerUpdateState(() => this.handleRespawn());
        });
    }

    public handleRespawn(): void {
        const {
            enemyLevelState: { enemies }
        } = appState();

        if (enemies.length < 8) {
            const newEnemy = enemyFactory("asteroid-down");
            EnemyLevelRunner.addEnemy(newEnemy);
        }
    }

    public dispose(): void {
        super.dispose();
    }
}