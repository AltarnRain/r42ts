/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { downAngleProvider } from "../AngleProviders/DownAngleProvider";
import { twoPXBullet } from "../Assets/twoPXBullet";
import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BulletProvider from "../BulletProviders/BulletProvider";
import { angles } from "../Constants/Angles";
import CGAColors from "../Constants/CGAColors";
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

    /**
     * Start Level 02
     */
    public start(): void {
        super.start();

        this.enemies = robotSpawnLocationsAndColor.map((lc) => {
            const bulletProvider = new BulletProvider(200, twoPXBullet, CGAColors.lightRed, 3, 4, 0, shouldFire, downAngleProvider);
            return new RobotEnemy(lc.location, 150, lc.color, new VanishRightAppearLeft(3, 5), bulletProvider);
        });
        this.begin();
    }
}

/**
 * Level 02 robot canFire. Only the right most robot fires bullets.
 * @param {BaseEnemy} self. Reference to a robot object. Called from within the RobotEnemy to determine
 * if the robot can fire bullets or not.
 */
function shouldFire(self: BaseEnemy): boolean {
    const { enemyLevelState: levelState } = appState();
    const lastEnemy = levelState.enemies[levelState.enemies.length - 1];

    if (lastEnemy !== undefined) {
        if (lastEnemy === self) {
            const rnd = Math.ceil(Math.random() * 2);
            return true && rnd === 1;
        }
    }

    return false;
}