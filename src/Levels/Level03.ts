/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemyLevel from "../Base/BaseEnemyLevel";
import BulletRunner from "../BulletProviders/BulletRunner";
import CGAColors from "../Constants/CGAColors";
import { MovementAngles, Speeds } from "../Constants/Constants";
import { orbFireFrequence } from "../Constants/FireFrequences";
import { enemyFactory } from "../Enemies/EnemyFactory";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import orbsToFire from "../Enemies/Orb/OrbsToFire";
import orbEnemyAngleProvider from "../FireAngleProviders/OrbEnemyAngleProvider";
import orbFireCheck from "../FireChecks/OrbFireCheck";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";

/**
 * Module:          Level03
 * Responsibility:  Define level 03
 */

export class Level03 extends BaseEnemyLevel {

    public start(): void {
        super.start();
        const enemies = orbSpawnLocations.map((location) => {
            return enemyFactory("orb", location.left, location.top, MovementAngles.orb);
        });

        const bulletRunner = new BulletRunner(getTwoPixelBullet, CGAColors.magenta, Speeds.Bullets.orb, orbEnemyAngleProvider, orbsToFire, orbFireCheck);
        this.begin(enemies, orbFireFrequence, bulletRunner);
    }
}
