/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

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
import { DownAngleProvider } from "../AngleProviders/DownAngleProvider";

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

        const downAngleProvider = new DownAngleProvider();
        this.enemies = robotSpawnLocationsAndColor.map((lc) => {
            const bulletProvider = new BulletProvider(200, twoPXBullet, CGAColors.lightRed, angles.down, 3, 4, 0, shouldFire);
            return new RobotEnemy(lc.location, 150, lc.color, new VanishRightAppearLeft(3, 5), bulletProvider, downAngleProvider);
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