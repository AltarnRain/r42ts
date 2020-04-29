/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import { OrbBulletSpeed as orbBulletSpeed } from "../Constants/EnemyBulletSpeed";
import { OrbFrameTime } from "../Constants/EnemyFrameTime";
import { orbMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { orbFireFrequence } from "../Constants/FireFrequences";
import { orbAngle } from "../Constants/MovementAngles";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import OrbEnemy from "../Enemies/Orb/OrbEnemy";
import getOrbFrames from "../Enemies/Orb/OrbFrames";
import orbEnemyAngleProvider from "../FireAngleProviders/OrbEnemyAngleProvider";
import orbFireCheck from "../FireChecks/OrbFireCheck";
import MoveDownAppearUp from "../LocationProviders/MoveDownAppearUp";
import CircleFrameProvider from "../Providers/CircleFrameProvider";
import dimensionProvider from "../Providers/DimensionProvider";
import { getExplosion02 } from "../SharedFrames/Explosion02";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { getMaximumFrameDimensions } from "../Utility/Frame";

/**
 * Module:          Level03
 * Responsibility:  Define level 03
 */

const {
    averagePixelSize
} = dimensionProvider();

export class Level03 extends BaseLevel {

    public start(): void {
        super.start();
        const enemies = orbSpawnLocations.map((startLocation) => {
            const frameProvider = new CircleFrameProvider(0);

            const { width, height } = getMaximumFrameDimensions(getOrbFrames().frames, averagePixelSize);
            const locationProvider = new MoveDownAppearUp(80, startLocation.left, startLocation.top,  orbMovementSpeed, orbAngle, width, height );
            return new OrbEnemy( OrbFrameTime, locationProvider, frameProvider, getExplosion02, getOrbFrames, orbEnemyAngleProvider);
        });

        const bulletRunner = new BulletRunner(getTwoPixelBullet, CGAColors.magenta, orbBulletSpeed, orbFireCheck);
        this.begin(enemies, orbFireFrequence, bulletRunner);
    }
}
