/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import { RobotBulletSpeed } from "../Constants/EnemyBulletSpeed";
import { RobotFrameTime } from "../Constants/EnemyFrameTime";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import downFireAngleProvider from "../FireAngleProviders/DownAngleProvider";
import robotLevel02FireCheck from "../FireChecks/RobotFireCheck";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";

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

        const bulletProvider = new BulletRunner(getTwoPixelBullet, CGAColors.lightRed, RobotBulletSpeed, robotLevel02FireCheck);
        this.begin(enemies, 200, bulletProvider);
    }
}