/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseLevel from "../Base/BaseLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import { orbBulletSpeed } from "../Constants/BulletSpeeds";
import CGAColors from "../Constants/CGAColors";
import { orbMovementSpeed } from "../Constants/EnemyMovementSpeeds";
import { orbFireFrequence } from "../Constants/FireFrequences";
import { orbAngle } from "../Constants/MovementAngles";
import { enemyFactory } from "../Enemies/EnemyFactory";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import orbsToFire from "../Enemies/Orb/OrbsToFire";
import orbFireCheck from "../FireChecks/OrbFireCheck";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";

/**
 * Module:          Level03
 * Responsibility:  Define level 03
 */

export class Level03 extends BaseLevel {

    public start(): void {
        super.start();
        const enemies = orbSpawnLocations.map((location) => {
            return enemyFactory("orb", location.left, location.top, orbMovementSpeed, orbAngle);
        });

        const bulletRunner = new BulletRunner(getTwoPixelBullet, CGAColors.magenta, orbBulletSpeed, orbsToFire, orbFireCheck);
        this.begin(enemies, orbFireFrequence, bulletRunner);
    }
}
