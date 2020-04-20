/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemyObject } from "../Base/BaseEnemyObject";
import BaseLevel from "../Base/BaseLevel";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import { appState } from "../State/Store";

/**
 * Module:          Level 02
 * Responsibility:  Define the second level.
 */

/**
 * Sets up level 02.
 */
export default class Level02 extends BaseLevel {
    public start(): void {
        super.start();
        this.enemies = robotSpawnLocationsAndColor.map((lc) => new RobotEnemy(lc.location, 150, lc.color, new VanishRightAppearLeft(1.5, 5) , canFire));
        this.begin();
    }
}

/**
 * Level 02 robot canFire. Only the right most robot fires bullets.
 * @param {BaseEnemyObject} self. Reference to a robot object. Called from within the RobotEnemy to determine
 * if the robot can fire bullets or not.
 */
function canFire(self: BaseEnemyObject): boolean {
    const { levelState } = appState();
    const lastEnemy = levelState.enemies[levelState.enemies.length - 1];

    if (lastEnemy !== undefined) {
        if (lastEnemy === self) {
            return true;
        }
    }

    return false;
}