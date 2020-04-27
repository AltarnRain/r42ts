/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import { OrbBulletSpeed } from "../Constants/EnemyBulletSpeed";
import { OrbFrameTime } from "../Constants/EnemyFrameTime";
import { OrbMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { orbFireFrequence } from "../Constants/FireFrequences";
import { orbAngle } from "../Constants/MovementAngles";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import orbEnemyAngleProvider from "../FireAngleProviders/OrbEnemyAngleProvider";
import orbFireCheck from "../FireChecks/OrbFireCheck";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";

/**
 * Module:          Level03
 * Responsibility:  Define level 03
 */

export class Level03 extends BaseLevel {

    public start(): void {
        super.start();
        const enemies = orbSpawnLocations.map((startLocation) => {
            const frameProvider = new CircleFrameProvider(0);
            const locationProvider = new MoveDownAppearUp(80, OrbMovementSpeed, orbAngle);
            return new OrbEnemy(startLocation.left, startLocation.top, OrbFrameTime, locationProvider, frameProvider, orbEnemyAngleProvider);
        });

        const bulletRunner = new BulletRunner(getTwoPixelBullet, CGAColors.magenta, OrbBulletSpeed, orbFireCheck);
        this.begin(enemies, orbFireFrequence, bulletRunner);
    }
}
