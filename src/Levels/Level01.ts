/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemyLevel from "../Base/BaseEnemyLevel";
import { MovementAngles } from "../Constants/Constants";
import { enemyProvider } from "../Enemies/EnemyProvider";
import sevenSixSeverGridProvider from "../Providers/SpawnLocations/SevenSixSevenGridProvider";
import { getRandomArrayElement } from "../Utility/Array";

/**
 * Module:          Level 01
 * Responsibility:  Define the first level.
 */

/**
 * Sets up level 01.
 */
export default class Level01 extends BaseEnemyLevel {

    /**
     * Start Level 01.
     */
    public start(): void {
        super.start();

        const enemies = sevenSixSeverGridProvider().map((location) => {

            // This may deviate from te original game but I do not care. Each birds will
            // begin to move in a random direction determined by the function below
            const randomMovementAngle = getRandomArrayElement(MovementAngles.bird);
            return enemyProvider("bird", location.left, location.top, randomMovementAngle);
        });

        this.begin(enemies);
    }
}