/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { BaseEnemy } from "../Base/BaseEnemy";
import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import downFireAngleProvider from "../FireAngleProviders/DownAngleProvider";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { appState } from "../State/Store";
import { RobotFrameTime } from "../Constants/EnemyFrameTime";

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

        const enemies = robotSpawnLocationsAndColor.map((lc) => {
            const frameProvider = new BackAndForthFrameProvider(0);
            const LocationProvider = new VanishRightAppearLeft(0, 5);

            return new RobotEnemy(lc.left, lc.top, RobotFrameTime, lc.color, LocationProvider, frameProvider, downFireAngleProvider);
        });

        const bulletProvider = new BulletRunner(getTwoPixelBullet, CGAColors.lightRed, 5, shouldFire);
        this.begin(enemies, 200, bulletProvider);
    }
}

/**
 * Level 02 robot canFire. Only the right most robot fires bullets.
 * @param {BaseEnemy} self. Reference to a robot object. Called from within the RobotEnemy to determine
 * if the robot can fire bullets or not.
 */
function shouldFire(enemy: BaseEnemy): boolean {
    const { enemyLevelState } = appState();
    const lastEnemy = enemyLevelState.enemies[enemyLevelState.enemies.length - 1];

    if (lastEnemy !== undefined) {
        if (lastEnemy.ship === enemy) {
            const rnd = Math.ceil(Math.random() * 20);
            return rnd === 1;
        }
    }

    return false;
}