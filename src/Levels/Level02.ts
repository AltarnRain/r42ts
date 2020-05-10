/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemyLevel from "../Base/BaseEnemyLevel";
import CGAColors from "../Constants/CGAColors";
import { MovementAngles, Speeds } from "../Constants/Constants";
import { robotFireFrequence } from "../Constants/FireFrequences";
import { enemyProvider } from "../Enemies/EnemyProvider";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import firstEnemyOccasionalDown from "../Providers/ShipsToFireProviders/FirstEnemyOccasionalDown";
import BulletRunner from "../Runners/BulletRunner";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";

/**
 * Module:          Level 02
 * Responsibility:  Define the second level.
 */

/**
 * Sets up level 02.
 */
export default class Level02 extends BaseEnemyLevel {

    /**
     * Start Level 02
     */
    public start(): void {
        super.start();

        const enemies = robotSpawnLocationsAndColor.map((lc) => {
            return enemyProvider("robot", lc.left, lc.top, MovementAngles.robot, lc.color);
        });

        const bulletProvider = new BulletRunner(getTwoPixelBullet, CGAColors.lightRed, Speeds.Bullets.robot, firstEnemyOccasionalDown);
        this.begin(enemies, robotFireFrequence, bulletProvider);
    }
}