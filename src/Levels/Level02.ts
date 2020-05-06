/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemyLevel from "../Base/BaseEnemyLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import { robotBulletSpeed } from "../Constants/BulletSpeeds";
import CGAColors from "../Constants/CGAColors";
import { robotMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { robotFireFrequence } from "../Constants/FireFrequences";
import { robotAngle as robotAngle } from "../Constants/MovementAngles";
import { enemyFactory } from "../Enemies/EnemyFactory";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import robotsToFire from "../Enemies/Robot/RobotsToFire";
import robotLevel02FireCheck from "../FireChecks/RobotFireCheck";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import downFireAngleProvider from "../FireAngleProviders/DownAngleProvider";

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
            return enemyFactory("robot", lc.left, lc.top, robotMovementSpeed, robotAngle, lc.color);
        });

        const bulletProvider = new BulletRunner(getTwoPixelBullet, CGAColors.lightRed, robotBulletSpeed, downFireAngleProvider, robotsToFire, robotLevel02FireCheck);
        this.begin(enemies, robotFireFrequence, bulletProvider);
    }
}