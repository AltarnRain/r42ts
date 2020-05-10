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
import maxFiveDiagonal from "../Providers/ShipsToFireProviders/MaxFiveDiagonal";
import sevenSixSeverGridProvider from "../Providers/SpawnLocations/SevenSixSevenGridProvider";
import BulletRunner from "../Runners/BulletRunner";
import getTwoPixelBullet from "../SharedFrames/twoPXBullet";
import { getRandomArrayElement } from "../Utility/Array";

/**
 * Module:          Level05
 * Responsibility:  Define level 05
 */

export class Level05 extends BaseEnemyLevel {

    public start(): void {
        super.start();
        const enemies = sevenSixSeverGridProvider().map((location) => {
            const randomAngle = getRandomArrayElement(MovementAngles.spinner);
            return enemyProvider("spinner", location.left, location.top, randomAngle);
        });

        const bulletRunner = new BulletRunner(getTwoPixelBullet, CGAColors.white, Speeds.Bullets.spinner, maxFiveDiagonal);
        this.begin(enemies, orbFireFrequence, bulletRunner);
    }
}
