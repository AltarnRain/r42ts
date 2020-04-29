/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import { RobotBulletSpeed } from "../Constants/EnemyBulletSpeed";
import { robotFrameTime } from "../Constants/EnemyFrameTime";
import { robotMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { robotFireFrequence } from "../Constants/FireFrequences";
import { robotAngle as robotAngle } from "../Constants/MovementAngles";
import RobotEnemy from "../Enemies/Robot/RobotEnemy";
import getRobotFrames from "../Enemies/Robot/RobotFrames";
import robotSpawnLocationsAndColor from "../Enemies/Robot/RobotSpawnLocationsAndColor";
import downFireAngleProvider from "../FireAngleProviders/DownAngleProvider";
import robotLevel02FireCheck from "../FireChecks/RobotFireCheck";
import VanishRightAppearLeft from "../LocationProviders/VanishRightAppearLeft";
import BackAndForthFrameProvider from "../Providers/BackAndForthFrameProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { getExplosion02 } from "../SharedFrames/Explosion02";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { getMaximumFrameDimensions } from "../Utility/Frame";

/**
 * Module:          Level 02
 * Responsibility:  Define the second level.
 */

const {
    averagePixelSize
} = dimensionProvider();
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

            const { width, height } = getMaximumFrameDimensions(getRobotFrames().frames, averagePixelSize);
            const locationProvider = new VanishRightAppearLeft(lc.left, lc.top, robotMovementSpeed, robotAngle, width, height);

            return new RobotEnemy(lc.color, robotFrameTime, locationProvider, frameProvider, getExplosion02, getRobotFrames, downFireAngleProvider);
        });

        const bulletProvider = new BulletRunner(getTwoPixelBullet, CGAColors.lightRed, RobotBulletSpeed, robotLevel02FireCheck);
        this.begin(enemies, robotFireFrequence, bulletProvider);
    }
}