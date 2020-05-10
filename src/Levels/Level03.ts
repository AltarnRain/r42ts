/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemyLevel from "../Base/BaseEnemyLevel";
import CGAColors from "../Constants/CGAColors";
import { MovementAngles, Speeds } from "../Constants/Constants";
import { orbFireFrequence } from "../Constants/FireFrequences";
import { enemyProvider } from "../Enemies/EnemyProvider";
import orbSpawnLocations from "../Enemies/Orb/OrbEnemiesSpawnLocations";
import maxFiveDiagonal from "../Providers/ShipsToFireProviders/MaxFiveDiagonal";
import BulletRunner from "../Runners/BulletRunner";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";

/**
 * Module:          Level03
 * Responsibility:  Define level 03
 */

export class Level03 extends BaseEnemyLevel {

    public start(): void {
        super.start();
        const enemies = orbSpawnLocations.map((location) => {
            return enemyProvider("orb", location.left, location.top, MovementAngles.orb);
        });

        const bulletRunner = new BulletRunner(getTwoPixelBullet, CGAColors.magenta, Speeds.Bullets.orb, maxFiveDiagonal);
        this.begin(enemies, orbFireFrequence, bulletRunner);
    }
}
